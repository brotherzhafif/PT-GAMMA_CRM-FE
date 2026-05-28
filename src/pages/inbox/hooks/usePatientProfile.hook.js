import { useEffect, useState, startTransition } from "react";
import { getPatientByPhoneNumber } from "@/services/patients.service";

export function usePatientProfile(phoneNumber) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!phoneNumber) return;

    const fetchPatient =
      async () => {
        try {
          startTransition(() => {
            setLoading(true);
          });

          const data =
            await getPatientByPhoneNumber(
              phoneNumber
            );

          setPatient(data);
        } catch (error) {
          console.error(
            "Failed get patient:",
            error
          );

          setPatient(null);
        } finally {
          setLoading(false);
        }
      };

    fetchPatient();
  }, [phoneNumber]);

  return {
    patient,
    loading,
  };
}