import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  imagePreview: string;

  isSubmitting = false;
  isImageUploaded = false;

  allowedImageFormats = ['png', 'jpg', 'jpeg'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let name = '';
    let bio = '';
    if (this.authService.username !== 'undefined' && this.authService.username !== '' && this.authService.username !== null) {
      name = this.authService.username;
    }
    if (this.authService.bio !== 'undefined' && this.authService.bio !== '' && this.authService.bio !== null) {
      bio = this.authService.bio;
    }
    if (this.authService.imagePath !== 'undefined' && this.authService.imagePath) {
      this.imagePreview = this.authService.imagePath;
    }

    this.editProfileForm = this.formBuilder.group({
      name: [name, Validators.required],
      bio: [bio],
      image: [null]
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    let file;
    if (files && files.length > 0) {
      file = files[0];
    }

    console.log(file);

    if (file && this.allowedImageFormats.indexOf(file?.type.split("/")[1]) === -1) {
      this.snackbar.open("Please upload png, jpg or jpeg images", "Okay", {
        duration: 2000
      });
      return;
    }

    this.editProfileForm.patchValue({
      image: file
    });
    this.editProfileForm.get('image')?.updateValueAndValidity();
    this.isImageUploaded = true;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage() {
    this.imagePreview = '';
    this.authService.imagePath = '';
  }

  editProfile() {
    if (!this.editProfileForm.valid) {
      return;
    }

    this.isSubmitting = true;

    if (this.isImageUploaded) {
      this.saveAsFormData();
    } else {
      this.saveAsJson();
    }
  }

  saveAsFormData() {
    const userFormData = new FormData();
    userFormData.append("name", this.editProfileForm.get('name')?.value);
    userFormData.append("bio", this.editProfileForm.get('bio')?.value);
    userFormData.append("image", this.editProfileForm.get('image')?.value, this.editProfileForm.get('name')?.value)

    this.apiService.editProfile(userFormData).subscribe((data) => {
      console.log(data);
      this.authService.username = this.editProfileForm.get('name')?.value;
      this.authService.bio = this.editProfileForm.get('bio')?.value;
      this.authService.imagePath = data.imagePath;
      this.authService.saveUserData();
      this.snackbar.open("Updated your profile", "Yay!", {
        duration: 3000
      });
      this.isSubmitting = false;
    }, (error) => {
      this.snackbar.open("Could not update your profile", "Oh!", {
        duration: 3000
      });
      this.isSubmitting = false;
    });
  }

  saveAsJson() {
    const userData = {
      name: this.editProfileForm.get('name')?.value,
      bio: this.editProfileForm.get('bio')?.value,
      imagePath: this.imagePreview
    }
    this.apiService.editProfileAsJson(userData).subscribe((data) => {
      this.authService.username = userData.name;
      this.authService.bio = userData.bio;
      this.authService.imagePath = userData.imagePath;
      this.authService.saveUserData();
      this.snackbar.open("Updated your profile", "Yay!", {
        duration: 3000
      });
      this.isSubmitting = false;
    }, (error) => {
      this.snackbar.open("Could not update your profile", "Oh!", {
        duration: 3000
      });
      this.isSubmitting = false;
    });
  }

}
