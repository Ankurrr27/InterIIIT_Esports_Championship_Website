"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Mail,
  Briefcase,
  FileText,
  Upload,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/5";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block";

export default function JoinIECForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    instagram: "",
    linkedin: "",
    reason_to_join: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("File must be an image");
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmed) {
      toast.error("Please confirm that you are an IIIT student");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (profileImage) {
        data.append("image", profileImage);
      }

      const res = await fetch("/api/iec-team-applications", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-green-500/10 p-4">
          <CheckCircle2 size={64} className="text-green-500" />
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Application Submitted
        </h2>
        <p className="mx-auto max-w-md text-sm text-gray-400">
          Your application to join the IEC team has been submitted successfully.
          We&apos;ll review it and get back to you on your email soon.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SECTION 1: Personal Info */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <User size={20} className="text-red-500" />
          Personal Info
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 md:col-span-2">
            <div>
              <label className={labelClass}>Profile Image</label>
              <div className="mt-2 flex items-center gap-6">
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-black/50"
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    <Upload size={18} className="text-gray-400 group-hover:text-red-500" />
                    <span>Upload Photo (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: Square image, PNG or JPG format.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Full Name *</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Email *</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@iiit.ac.in"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Role & Socials */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <Briefcase size={20} className="text-red-500" />
          Role &amp; Socials
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative group md:col-span-2">
            <label className={labelClass}>Role *</label>
            <div className="relative">
              <Briefcase size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <select
                required
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>Select a role...</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Design">Design</option>
                <option value="Content">Content</option>
                <option value="Social">Social</option>
                <option value="Development">Development</option>
                <option value="Management">Management</option>
              </select>
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Instagram</label>
            <div className="relative">
              <FaInstagram size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@handle"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>LinkedIn</label>
            <div className="relative">
              <FaLinkedin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Motivation */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <FileText size={20} className="text-red-500" />
          Motivation
        </h3>

        <div className="grid gap-6">
          <div className="relative group">
            <label className={labelClass}>Why do you want to join? *</label>
            <textarea
              required
              name="reason_to_join"
              value={formData.reason_to_join}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us why you'd like to be part of the IEC organizing team..."
              className={`${inputClass} resize-none py-3 pl-4`}
            />
          </div>
        </div>
      </div>

      {/* Confirmation & Submit */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-black/40 p-6 sm:flex-row sm:p-8">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-400">
          <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-500 bg-transparent transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-600">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <CheckCircle2 size={14} className="text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
          <span>
            I confirm that I am a student at an IIIT.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !confirmed}
          className="relative flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#cc0000] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#aa0000] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
          {!loading && <ArrowRight size={18} className="ml-2" />}
        </button>
      </div>
    </form>
  );
}
