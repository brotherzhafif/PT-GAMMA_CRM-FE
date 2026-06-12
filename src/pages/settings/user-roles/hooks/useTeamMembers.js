import { useEffect, useMemo, useState } from "react";
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from "@/services/users.service";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "",
  is_active: true,
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.detail || error.response?.data?.message || fallback;

const normalizeUsers = (data) =>
  Array.isArray(data) ? data : data?.data || [];

export function useTeamMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const isEditing = Boolean(editingUser);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => (a.name || "").localeCompare(b.name || "")),
    [users],
  );

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(normalizeUsers(data));
    } catch (err) {
      setError(getErrorMessage(err, "Gagal memuat daftar user."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    getUsers()
      .then((data) => {
        if (!active) return;
        setUsers(normalizeUsers(data));
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(getErrorMessage(err, "Gagal memuat daftar user."));
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "",
      is_active: user.is_active !== false,
    });
    setDialogOpen(true);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isEditing) {
        await updateUserById(editingUser.id, {
          name: form.name,
          role: form.role,
          is_active: form.is_active,
        });
        toast.success("User diperbarui", {
          description: `${form.name} berhasil disimpan.`,
        });
      } else {
        await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
        toast.success("User berhasil dibuat", {
          description: `${form.email} sudah bisa mengakses CRM.`,
        });
      }

      setDialogOpen(false);
      await loadUsers();
    } catch (err) {
      const message = getErrorMessage(err, "Gagal menyimpan user.");
      setError(message);
      toast.error("Gagal menyimpan user", {
        description: message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    try {
      setError("");
      await deleteUserById(user.id);
      await loadUsers();
      toast.success("User dihapus", {
        description: `${user.name || user.email} sudah dihapus dari team.`,
      });
    } catch (err) {
      const message = getErrorMessage(err, "Gagal menghapus user.");
      setError(message);
      toast.error("Gagal menghapus user", {
        description: message,
      });
    }
  };

  return {
    dialogOpen,
    error,
    form,
    handleDelete,
    handleFormChange,
    handleSubmit,
    isEditing,
    loading,
    openCreateDialog,
    openEditDialog,
    saving,
    setDialogOpen,
    sortedUsers,
  };
}
