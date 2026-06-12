import { useEffect, useState, startTransition } from "react";

import {
  getPatientById,
  getPatientByPhoneNumber,
} from "@/services/patients.service";

const unwrapResponse = (response) => response?.data || response;

const getResolvedPatientId = (patient) =>
  patient?.rme_patient_id ||
  patient?.rmePatientId ||
  patient?.rme_patients_id ||
  patient?.patient_id ||
  patient?.patientId ||
  patient?.id;

export function usePatientProfile({ patientId, phoneNumber }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!patientId && !phoneNumber) return;

    let isActive = true;

    const fetchPatient =
      async () => {
        try {
          startTransition(() => {
            setLoading(true);
          });

          const patientLookup = patientId
            ? null
            : unwrapResponse(
                await getPatientByPhoneNumber(
                  phoneNumber
                )
              );

          const resolvedPatientId =
            patientId ||
            getResolvedPatientId(patientLookup);

          if (!resolvedPatientId) {
            if (isActive) {
              setPatient(null);
            }
            return;
          }

          const data =
            unwrapResponse(
              await getPatientById(
                resolvedPatientId
              )
            );

          if (isActive) {
            setPatient(data);
          }
        } catch (error) {
          console.error(
            "Failed get patient:",
            error
          );

          if (isActive) {
            setPatient(null);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

    fetchPatient();

    return () => {
      isActive = false;
    };
  }, [patientId, phoneNumber]);

  return {
    patient: patientId || phoneNumber ? patient : null,
    loading: patientId || phoneNumber ? loading : false,
  };
}
