import { Component, OnInit } from '@angular/core';
import { CommonModule, NgPlural } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SeafarerService } from '../../Core/services/seafarer.service';
import { DropdownService } from '../../Core/services/dropdown.service';
import { DropdownItem, SeafarerRequest, Seafarer, Qualification, Certificate, Language, Reference, WorkExperience } from '../../Core/models/seafarer.model';

@Component({
  selector: 'app-seafarer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    // NgPlural
  ],
  templateUrl: './seafarer-form.html',
  styleUrl: './seafarer-form.scss'
})

export class SeafarerFormComponent implements OnInit {
  seafarerForm!: FormGroup;
  employees: DropdownItem[] = [];
  vendors: DropdownItem[] = [];
  isLoading = false;
  isEditMode = false;
  seafarerId?: number;

  constructor(
    private fb: FormBuilder,
    private seafarerService: SeafarerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();    // 1. intialize form

    this.loadDropdownData();  // 2. loadDropdown data from the Backend

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.seafarerId = +params['id'];        // convert 'id' to number and store it in seafarerId
        this.loadSeafarerData(this.seafarerId); // load seafarer data for edit
      }
    });
  }

  initializeForm(): void {
    this.seafarerForm = this.fb.group({
      PassPortIssueDate: [''],
      IDExPiryDate: [''],
      SeamanBookNO: [''],
      Remarks: [''],
      // EmpId: ['', Validators.required],
      // VisaSponsorId: ['', Validators.required],
      VisaIssueDate: [''],
      VisaExpiryDate: [''],
      NameOfSpouse: [''],
      NoOfChildren: [0],
      BodyWeight: [0],
      Height: [0],
      VisaUAEIdNO: [''],
      NearestAirport: [''],
      ResidenceNumber: [''],
      SkypeID: [''],
      PermanentAddressHomeCountry: [''],
      ContactNumberHomeCountry: [''],
      ContactNameAndNumberDuringEmergenciesUAE: [''],
      ContactNameAndNumberDuringEmergenciesHome: [''],
      SeamanIssueDate: [''],
      SeamanExpiryDate: [''],
      CicpaNO: [''],
      CicpaIssueDate: [''],
      CicpaExpiryDate: [''],
      Declaration: [''],

      SignedOffFromAShipDueToMedicalReason: [false],
      SignedOffFromAShipDueToMedicalReasonComment: [''],
      UndergoneAnyMedicalOperation: [false],
      UndergoneAnyMedicalOperationComment: [''],
      DoctorConsultation: [false],
      DoctorConsultationComment: [''],
      HealthOrDisabilityProblem: [false],
      HealthOrDisabilityProblemComment: [''],
      InquiryOrInvolvedMaritimeAccident: [false],
      InquiryOrInvolvedMaritimeAccidentComment: [''],
      LicenseSuspendedOrRevoked: [false],
      LicenseSuspendedOrRevokedComment: [''],

      qualifications: this.fb.array([]),
      certificates: this.fb.array([]),
      languages: this.fb.array([]),
      references: this.fb.array([]),
      workExperiences: this.fb.array([])
    });
  }

  loadDropdownData(): void {
    this.dropdownService.getEmployees().subscribe({ // 1. GetEmployees
      next: (data) => this.employees = data,
      error: (error) => console.error('Error loading employees:', error)
    });

    this.dropdownService.getVendors().subscribe({  // 2. GetVendeors
      next: (data) => this.vendors = data,
      error: (error) => console.error('Error loading vendors:', error)
    });
  }


  loadSeafarerData(id: number): void {
    this.isLoading = true; // show load indicator
    this.seafarerService.getAllSeafarers().subscribe({ // getAllSeafarers from Api
      next: (response) => {
        this.isLoading = false; // dispaly load indicator
        if (response && response.Data.length > 0) { // check on Response Data Firstly
          const seafarer = response.find((s: Seafarer) => s.Id === id); // find the Id that matched i
          if (seafarer) {
            this.populateForm(seafarer, response);// populateForm() takes the existing data From API  and fills it into the form controls.
          } else {
            this.snackBar.open("Seafarer not found in the list.", "Close", { duration: 3000 });
            this.router.navigate(["/seafarers"]);
          }
        } else {
          this.snackBar.open("No seafarer data found from getAllSeafarers.", "Close", { duration: 3000 });
          this.router.navigate(["/seafarers"]);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open("Failed to load seafarer data: " + error.message, "Close", { duration: 5000 });
        console.error("Error loading seafarer:", error);
        this.router.navigate(["/seafarers"]);
      }
    });
  }

  populateForm(seafarer: Seafarer, response: any): void {

    this.seafarerForm.patchValue({
      PassPortIssueDate: this.formatDateForInput(seafarer.PassPortIssueDate),
      IDExPiryDate: this.formatDateForInput(seafarer.NationalIdExpiryDate),
      SeamanBookNO: seafarer.SeamanBookNO,
      Remarks: seafarer.Remarks,
      EmpId: seafarer.EmpId,
      VisaSponsorId: seafarer.VisaSponsorId,
      VisaIssueDate: this.formatDateForInput(seafarer.VisaIssueDate),
      VisaExpiryDate: this.formatDateForInput(seafarer.VisaExpiryDate),
      NameOfSpouse: seafarer.NameOfSpouse,
      NoOfChildren: seafarer.NoOfChildren,
      BodyWeight: seafarer.BodyWeight,
      Height: seafarer.Height,
      VisaUAEIdNO: seafarer.VisaUAEIdNO,
      NearestAirport: seafarer.NearestAirport,
      ResidenceNumber: seafarer.ResidenceNumber,
      SkypeID: seafarer.SkypeID,
      PermanentAddressHomeCountry: seafarer.PermanentAddressHomeCountry,
      ContactNumberHomeCountry: seafarer.ContactNumberHomeCountry,
      ContactNameAndNumberDuringEmergenciesUAE: seafarer.ContactNameAndNumberDuringEmergenciesUAE,
      ContactNameAndNumberDuringEmergenciesHome: seafarer.ContactNameAndNumberDuringEmergenciesHome,
      SeamanIssueDate: this.formatDateForInput(seafarer.SeamanIssueDate),
      SeamanExpiryDate: this.formatDateForInput(seafarer.SeamanExpiryDate),
      CicpaNO: seafarer.CicpaNO,
      CicpaIssueDate: this.formatDateForInput(seafarer.CicpaIssueDate),
      CicpaExpiryDate: this.formatDateForInput(seafarer.CicpaExpiryDate),
      Declaration: seafarer.Declaration,
      SignedOffFromAShipDueToMedicalReason: seafarer.SignedOffFromAShipDueToMedicalReason,
      SignedOffFromAShipDueToMedicalReasonComment: seafarer.SignedOffFromAShipDueToMedicalReasonComment,
      UndergoneAnyMedicalOperation: seafarer.UndergoneAnyMdicalOperation,
      UndergoneAnyMedicalOperationComment: seafarer.UndergoneAnyMdicalOperationComment,
      DoctorConsultation: seafarer.DoctorConsultation,
      DoctorConsultationComment: seafarer.DoctorConsultationComment,
      HealthOrDisabilityProblem: seafarer.HealthOrDisabilityProblem,
      HealthOrDisabilityProblemComment: seafarer.HealthOrDisabilityProblemComment,
      InquiryOrInvolvedMaritimeAccident: seafarer.InquiryOrInvolvedMaritimeAccident,
      InquiryOrInvolvedMaritimeAccidentComment: seafarer.InquiryOrInvolvedMaritimeAccidentComment,
      LicenseSuspendedOrRevoked: seafarer.LicenseSuspendedOrRevoked,
      LicenseSuspendedOrRevokedComment: seafarer.LicenseSuspendedOrRevokedComment
    });

    this.populateQualifications(response.QualificationDetails || []);
    this.populateCertificates(response.Certificates || []);
    this.populateLanguages(response.Languages || []);
    this.populateReferences(response.References || []);
    this.populateWorkExperiences(response.WorkExperiences || []);
  }

  populateQualifications(qualifications: Qualification[]): void {
    const qualificationArray = this.qualifications;
    qualificationArray.clear();

    qualifications.filter(q => q.SeaFarerId === this.seafarerId).forEach(qualification => {
      const qualificationGroup = this.fb.group({
        DegreeOrCourse: [qualification.DegreeOrCourse || ''],
        CourseIssueDate: [this.formatDateForInput(qualification.CourseIssueDate) || ''],
        ExpiryDate: [this.formatDateForInput(qualification.ExpiryDate) || ''],
        MajorOrSubject: [qualification.MajorOrSubject || ''],
        University: [qualification.University || ''],
        Country: [qualification.Country || ''],
        Type: [qualification.Type || 1]
      });
      qualificationArray.push(qualificationGroup);
    });
  }

  populateCertificates(certificates: Certificate[]): void {
    const certificateArray = this.certificates;
    certificateArray.clear(); // cleare any existing certificates

    certificates.filter(c => c.SeaFarerId === this.seafarerId).forEach(certificate => {
      const certificateGroup = this.fb.group({
        Capacity: [certificate.Capacity || ''],
        Regulation: [certificate.Regulation || ''],
        IssueDate: [this.formatDateForInput(certificate.IssueDate) || ''],
        ExpiryDate: [this.formatDateForInput(certificate.ExpiryDate) || ''],
        IssuingAuthority: [certificate.IssuingAuthority || ''],
        Limitations: [certificate.Limitations || ''],
        Country: [certificate.Country || ''],
        Type: [certificate.Type || 1]
      });
      certificateArray.push(certificateGroup);
    });
  }

  populateLanguages(languages: Language[]): void {
    const languageArray = this.languages;
    languageArray.clear();

    languages.filter(l => l.SeaFarerId === this.seafarerId).forEach(language => {
      const languageGroup = this.fb.group({
        Language: [language.Language || ''],
        Spoken: [language.Spoken || ''],
        Written: [language.Written || ''],
        Understood: [language.Understood || ''],
        MotherTongue: [language.MotherTongue || '']
      });
      languageArray.push(languageGroup);
    });
  }

  populateReferences(references: Reference[]): void {
    const referenceArray = this.references;
    referenceArray.clear();

    references.filter(r => r.SeaFarerId === this.seafarerId).forEach(reference => {
      const referenceGroup = this.fb.group({
        PersonName: [reference.PersonName || ''],
        CompanyName: [reference.CompanyName || ''],
        Country: [reference.Country || ''],
        Fax: [reference.Fax || ''],
        EmailId: [reference.EmailId || '']
      });
      referenceArray.push(referenceGroup);
    });
  }

  populateWorkExperiences(workExperiences: WorkExperience[]): void {
    const workExperienceArray = this.workExperiences;
    workExperienceArray.clear();

    workExperiences.filter(w => w.SeaFarerId === this.seafarerId).forEach(workExperience => {
      const workExperienceGroup = this.fb.group({
        VesselName: [workExperience.VesselName || ''],
        VesselType: [workExperience.VesselType || ''],
        Rank: [workExperience.Rank || ''],
        From: [this.formatDateForInput(workExperience.From) || ''],
        To: [this.formatDateForInput(workExperience.To) || ''],
        GRT: [workExperience.GRT || ''],
        BHP: [workExperience.BHP || ''],
        CompanyName: [workExperience.CompanyName || '']
      });
      workExperienceArray.push(workExperienceGroup);
    });
  }

  formatDateForInput(dateString: string | undefined): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }


  get qualifications(): FormArray {
    return this.seafarerForm.get('qualifications') as FormArray;
  }

  get certificates(): FormArray {
    return this.seafarerForm.get('certificates') as FormArray;
  }

  get languages(): FormArray {
    return this.seafarerForm.get('languages') as FormArray;
  }

  get references(): FormArray {
    return this.seafarerForm.get('references') as FormArray;
  }

  get workExperiences(): FormArray {
    return this.seafarerForm.get('workExperiences') as FormArray;
  }


  addQualification(): void {
    const qualificationGroup = this.fb.group({
      DegreeOrCourse: [''],
      CourseIssueDate: [''],
      ExpiryDate: [''],
      MajorOrSubject: [''],
      University: [''],
      Country: [''],
      Type: [1]
    });
    this.qualifications.push(qualificationGroup);
  }

  removeQualification(index: number): void {
    this.qualifications.removeAt(index);
  }

  addCertificate(): void {
    const certificateGroup = this.fb.group({
      Capacity: [''],
      Regulation: [''],
      IssueDate: [''],
      ExpiryDate: [''],
      IssuingAuthority: [''],
      Limitations: [''],
      Country: [''],
      Type: [1]
    });
    this.certificates.push(certificateGroup);
  }

  removeCertificate(index: number): void {
    this.certificates.removeAt(index);
  }

  addLanguage(): void {
    const languageGroup = this.fb.group({
      Language: [''],
      Spoken: [''],
      Written: [''],
      Understood: [''],
      MotherTongue: ['']
    });
    this.languages.push(languageGroup);
  }
  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }


  addReference(): void {
    const referenceGroup = this.fb.group({
      PersonName: [''],
      CompanyName: [''],
      Country: [''],
      Fax: [''],
      EmailId: ['']
    });
    this.references.push(referenceGroup);
  }

  removeReference(index: number): void {
    this.references.removeAt(index);
  }

  addWorkExperience(): void {
    const workExperienceGroup = this.fb.group({
      VesselName: [''],
      VesselType: [''],
      Rank: [''],
      From: [''],
      To: [''],
      GRT: [''],
      BHP: [''],
      CompanyName: ['']
    });
    this.workExperiences.push(workExperienceGroup);
  }

  removeWorkExperience(index: number): void {
    this.workExperiences.removeAt(index);
  }

  onSubmit(): void {
    if (this.seafarerForm.valid) {
      this.isLoading = true;

      const formValue = this.seafarerForm.value;
      const seafarerRequest: SeafarerRequest = {
        entity: {
          Id: this.isEditMode ? this.seafarerId : 0,
          ...formValue
        },

        Qualifications: formValue.qualifications || [],
        Certificates: formValue.certificates || [],
        Languages: formValue.languages || [],
        References: formValue.references || [],
        WorkExperiences: formValue.workExperiences || []
      };

      this.seafarerService.saveSeafarer(seafarerRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open(
            this.isEditMode ? 'Seafarer updated successfully!' : 'Seafarer created successfully!',
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['/seafarers']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Failed to save seafarer: ' + error.message, 'Close', {
            duration: 5000
          });
          console.error('Error saving seafarer:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.seafarerForm);
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
    }
  }

  private markFormGroupTouched(formGroup: any): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          this.markFormGroupTouched(arrayControl);
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/seafarers']);
  }


}

