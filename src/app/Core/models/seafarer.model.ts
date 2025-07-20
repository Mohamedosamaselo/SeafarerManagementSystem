export interface Seafarer {
  Id?: number;
  KinName?: string;
  KinPhone?: string;
  KinEmail?: string;
  PassPortIssueDate?: string;
  EmpId?: number;
  VisaSponsorId?: number;
  Remarks?: string;
  VisaIssueDate?: string;
  VisaExpiryDate?: string;
  EmployeeName?: string;
  SponsorName?: string;
  EmployeeCode?: string;
  JobName?: string;
  Nationality?: string;
  BirthDate?: string;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  NationalId?: string;
  EmploymentDate?: string;
  InsuranceDate?: string;
  PassportExpireDate?: string;
  PassportNumber?: string;
  Age?: string;
  EmployeeNameAR?: string;
  EmployeeNameEN?: string;
  JobNameEN?: string;
  JobNameAR?: string;
  Salary?: number;
  Address?: string;
  Gender?: string;
  Religion?: string;
  InsuranceNumber?: string;
  Area?: string;
  MilitaryServiceExpireDate?: string;
  SyndicateCardNumber?: string;
  SyndicateExpirationDate?: string;
  BusinessPhone?: string;
  BirthPlace?: string;
  NationalIdExpiryDate?: string;
  Company?: string;
  PostCategoryLevel?: string;
  Tier?: string;
  DrivingLicenseNumber?: string;
  WorkPermit?: string;
  PermitNumber?: string;
  BloodType?: string;
  WorkLocation?: string;
  PermitExpirationDate?: string;
  Notes?: string;
  MedicalInsuranceAmount?: number;
  InsuranceTitle?: string;
  InsuranceOffice?: string;
  MedicalInsuranceNo?: string;
  MedicalInsuranceDate?: string;
  GraduationYear?: string;
  PostGraduateDegree?: string;
  PostGraduateUniversity?: string;
  PostGraduateSpecialty?: string;
  PostGraduateGrade?: string;
  PropationEndDate?: string;
  EmpManager?: string;
  NameOfSpouse?: string;
  NoOfChildren?: number;
  BodyWeight?: number;
  Height?: number;
  VisaUAEIdNO?: string;
  NearestAirport?: string;
  ResidenceNumber?: string;
  SkypeID?: string;
  PermanentAddressHomeCountry?: string;
  ContactNumberHomeCountry?: string;
  ContactNameAndNumberDuringEmergenciesUAE?: string;
  ContactNameAndNumberDuringEmergenciesHome?: string;
  SeamanBookNO?: string;
  SeamanIssueDate?: string;
  SeamanExpiryDate?: string;
  CicpaNO?: string;
  CicpaIssueDate?: string;
  CicpaExpiryDate?: string;
  Declaration?: string;
  SignedOffFromAShipDueToMedicalReason?: boolean;
  SignedOffFromAShipDueToMedicalReasonComment?: string;
  UndergoneAnyMdicalOperation?: boolean;
  UndergoneAnyMdicalOperationComment?: string;
  DoctorConsultation?: boolean;
  DoctorConsultationComment?: string;
  HealthOrDisabilityProblem?: boolean;
  HealthOrDisabilityProblemComment?: string;
  InquiryOrInvolvedMaritimeAccident?: boolean;
  InquiryOrInvolvedMaritimeAccidentComment?: string;
  LicenseSuspendedOrRevoked?: boolean;
  LicenseSuspendedOrRevokedComment?: string;
  ConfirmationInsuranceDate?: string;
  MaritalStatus?: string;
  Status?: number;
  Basic?: string;
  Advanced?: string;
  FullLicence?: string;
  Maintenance?: string;
}

export interface Qualification {
  Id?: number;
  SeaFarerId?: number;
  DegreeOrCourse?: string;
  MajorOrSubject?: string;
  CourseIssueDate?: string;
  ExpiryDate?: string;
  University?: string;
  Country?: string;
  Type?: number;
}

export interface Certificate {
  Id?: number;
  SeaFarerId?: number;
  Capacity?: string;
  Regulation?: string;
  IssueDate?: string;
  ExpiryDate?: string;
  IssuingAuthority?: string;
  Country?: string;
  Limitations?: string;
  Type?: number;
}

export interface Language {
  Id?: number;
  SeaFarerId?: number;
  Language?: string;
  Spoken?: string;
  Written?: string;
  Understood?: string;
  MotherTongue?: string;
}

export interface Reference {
  Id?: number;
  SeaFarerId?: number;
  PersonName?: string;
  CompanyName?: string;
  Country?: string;
  Fax?: string;
  EmailId?: string;
}

export interface WorkExperience {
  Id?: number;
  SeaFarerId?: number;
  VesselName?: string;
  VesselType?: string;
  Rank?: string;
  From?: string;
  To?: string;
  GRT?: string;
  BHP?: string;
  CompanyName?: string;
}

export interface SeafarerRequest {
  entity: Seafarer;
  Qualifications: Qualification[];
  Certificates: Certificate[];
  Languages: Language[];
  References: Reference[];
  WorkExperiences: WorkExperience[];
}

export interface DropdownItem {
  Value: number;
  Text: string;
  Code?: string;
  Email?: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SeafarerApiResponse {
  Data: Seafarer[];
  QualificationDetails: Qualification[];
  Certificates: Certificate[];
  Languages: Language[];
  References: Reference[];
  WorkExperiences: WorkExperience[];
}


