export type AdmissionFormValues = {
  parentName: string;
  relationship: string;
  phone: string;
  alternatePhone: string;
  email: string;
  childName: string;
  childDob: string;
  ageGroup: string;
  program: string;
  startDate: string;
  address: string;
  city: string;
  notes: string;
};

export type AdmissionEnquirySubmission = {
  id: string;
  submittedAtIso: string;
  submittedAtLabel: string;
  values: AdmissionFormValues;
};

export const ADMISSION_FORM_DRAFT_STORAGE_KEY =
  "birla-open-minds-admission-form";
export const ADMISSION_ENQUIRIES_STORAGE_KEY =
  "birla-open-minds-admission-enquiries";

const defaultAdmissionValues: AdmissionFormValues = {
  parentName: "",
  relationship: "Mother",
  phone: "+91-7204039777",
  alternatePhone: "",
  email: "",
  childName: "",
  childDob: "",
  ageGroup: "",
  program: "Nursery",
  startDate: "",
  address: "",
  city: "Bengaluru East",
  notes: "",
};

function canUseLocalStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function normalizeAdmissionValues(
  values?: Partial<AdmissionFormValues>,
): AdmissionFormValues {
  return {
    parentName: values?.parentName || defaultAdmissionValues.parentName,
    relationship: values?.relationship || defaultAdmissionValues.relationship,
    phone: values?.phone || defaultAdmissionValues.phone,
    alternatePhone:
      values?.alternatePhone || defaultAdmissionValues.alternatePhone,
    email: values?.email || defaultAdmissionValues.email,
    childName: values?.childName || defaultAdmissionValues.childName,
    childDob: values?.childDob || defaultAdmissionValues.childDob,
    ageGroup: values?.ageGroup || defaultAdmissionValues.ageGroup,
    program: values?.program || defaultAdmissionValues.program,
    startDate: values?.startDate || defaultAdmissionValues.startDate,
    address: values?.address || defaultAdmissionValues.address,
    city: values?.city || defaultAdmissionValues.city,
    notes: values?.notes || defaultAdmissionValues.notes,
  };
}

export function getStoredAdmissionEnquiries(): AdmissionEnquirySubmission[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(ADMISSION_ENQUIRIES_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AdmissionEnquirySubmission>[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((submission, index) => ({
        id: submission.id || `enquiry-${index + 1}`,
        submittedAtIso: submission.submittedAtIso || new Date().toISOString(),
        submittedAtLabel:
          submission.submittedAtLabel ||
          new Date(submission.submittedAtIso || Date.now()).toLocaleString(),
        values: normalizeAdmissionValues(submission.values),
      }))
      .sort(
        (a, b) =>
          new Date(b.submittedAtIso).getTime() -
          new Date(a.submittedAtIso).getTime(),
      );
  } catch {
    return [];
  }
}

export function appendAdmissionEnquiry(values: AdmissionFormValues) {
  if (!canUseLocalStorage()) {
    return;
  }

  const now = new Date();
  const entry: AdmissionEnquirySubmission = {
    id: `enquiry-${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    submittedAtIso: now.toISOString(),
    submittedAtLabel: now.toLocaleString(),
    values: normalizeAdmissionValues(values),
  };

  const existing = getStoredAdmissionEnquiries();
  const next = [entry, ...existing];
  window.localStorage.setItem(
    ADMISSION_ENQUIRIES_STORAGE_KEY,
    JSON.stringify(next),
  );
}

export function updateAdmissionEnquiry(
  enquiryId: string,
  values: AdmissionFormValues,
) {
  if (!canUseLocalStorage()) {
    return false;
  }

  const current = getStoredAdmissionEnquiries();
  const updated = current.map((entry) =>
    entry.id === enquiryId
      ? {
          ...entry,
          values: normalizeAdmissionValues(values),
        }
      : entry,
  );

  window.localStorage.setItem(
    ADMISSION_ENQUIRIES_STORAGE_KEY,
    JSON.stringify(updated),
  );
  return true;
}

export function deleteAdmissionEnquiry(enquiryId: string) {
  if (!canUseLocalStorage()) {
    return false;
  }

  const current = getStoredAdmissionEnquiries();
  const updated = current.filter((entry) => entry.id !== enquiryId);

  window.localStorage.setItem(
    ADMISSION_ENQUIRIES_STORAGE_KEY,
    JSON.stringify(updated),
  );
  return true;
}
