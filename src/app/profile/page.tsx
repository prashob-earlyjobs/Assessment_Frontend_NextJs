"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import CreatableSelect from "react-select/creatable";
import cities from "../components/data/cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { getStaticSkills, getStaticRoles, getStaticTools } from "../components/services/staticApis";
import ProtectedRoute from "../components/services/protectedRoute";
import { useUser } from "../context";
import { updateProfile, uploadResume } from "../components/services/servicesapis";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronLeft,
  Upload,
  ChevronDown,
  Check,
  Plus,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

const COMMON_LANGUAGES = ["Abkhazian","Achinese","Acoli","Adangme","Adyghe","Afar","Afrihili","Afrikaans","Aghem","Ainu","Akan","Akkadian","Akoose","Alabama","Albanian","Aleut","Algerian Arabic","American English","American Sign Language","Amharic","Ancient Egyptian","Ancient Greek","Angika","Ao Naga","Arabic","Aragonese","Aramaic","Araona","Arapaho","Arawak","Armenian","Aromanian","Arpitan","Assamese","Asturian","Asu","Atsam","Australian English","Austrian German","Avaric","Avestan","Awadhi","Aymara","Azerbaijani","Badaga","Bafia","Bafut","Bakhtiari","Balinese","Baluchi","Bambara","Bamun","Banjar","Basaa","Bashkir","Basque","Batak Toba","Bavarian","Beja","Belarusian","Bemba","Bena","Bengali","Betawi","Bhojpuri","Bikol","Bini","Bishnupriya","Bislama","Blin","Blissymbols","Bodo","Bosnian","Brahui","Braj","Brazilian Portuguese","Breton","British English","Buginese","Bulgarian","Bulu","Buriat","Burmese","Caddo","Cajun French","Canadian English","Canadian French","Cantonese","Capiznon","Carib","Catalan","Cayuga","Cebuano","Central Atlas Tamazight","Central Dusun","Central Kurdish","Central Yupik","Chadian Arabic","Chagatai","Chamorro","Chechen","Cherokee","Cheyenne","Chibcha","Chiga","Chimborazo Highland Quichua","Chinese","Chinook Jargon","Chipewyan","Choctaw","Church Slavic","Chuukese","Chuvash","Classical Newari","Classical Syriac","Colognian","Comorian","Congo Swahili","Coptic","Cornish","Corsican","Cree","Creek","Crimean Turkish","Croatian","Czech","Dakota","Danish","Dargwa","Dazaga","Delaware","Dinka","Divehi","Dogri","Dogrib","Duala","Dutch","Dyula","Dzongkha","Eastern Frisian","Efik","Egyptian Arabic","Ekajuk","Elamite","Embu","Emilian","English","Erzya","Esperanto","Estonian","European Portuguese","European Spanish","Ewe","Ewondo","Extremaduran","Fang","Fanti","Faroese","Fiji Hindi","Fijian","Filipino","Finnish","Flemish","Fon","Frafra","French","Friulian","Fulah","Ga","Gagauz","Galician","Gan Chinese","Ganda","Gayo","Gbaya","Geez","Georgian","German","Gheg Albanian","Ghomala","Gilaki","Gilbertese","Goan Konkani","Gondi","Gorontalo","Gothic","Grebo","Greek","Guarani","Gujarati","Gusii","Gwichʼin","Haida","Haitian","Hakka Chinese","Hausa","Hawaiian","Hebrew","Herero","Hiligaynon","Hindi","Hiri Motu","Hittite","Hmong","Hungarian","Hupa","Iban","Ibibio","Icelandic","Ido","Igbo","Iloko","Inari Sami","Indonesian","Ingrian","Ingush","Interlingua","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Jamaican Creole English","Japanese","Javanese","Jju","Jola-Fonyi","Judeo-Arabic","Judeo-Persian","Jutish","Kabardian","Kabuverdianu","Kabyle","Kachin","Kaingang","Kako","Kalaallisut","Kalenjin","Kalmyk","Kamba","Kanembu","Kannada","Kanuri","Kara-Kalpak","Karachay-Balkar","Karelian","Kashmiri","Kashubian","Kawi","Kazakh","Kenyang","Khasi","Khmer","Khotanese","Khowar","Kikuyu","Kimbundu","Kinaray-a","Kinyarwanda","Kirmanjki","Klingon","Kom","Komi","Komi-Permyak","Kongo","Konkani","Korean","Koro","Kosraean","Kotava","Koyra Chiini","Koyraboro Senni","Kpelle","Krio","Kuanyama","Kumyk","Kurdish","Kurukh","Kutenai","Kwasio","Kyrgyz","Kʼicheʼ","Ladino","Lahnda","Lakota","Lamba","Langi","Lao","Latgalian","Latin","Latin American Spanish","Latvian","Laz","Lezghian","Ligurian","Limburgish","Lingala","Lingua Franca Nova","Literary Chinese","Lithuanian","Livonian","Lojban","Lombard","Low German","Lower Silesian","Lower Sorbian","Lozi","Luba-Katanga","Luba-Lulua","Luiseno","Lule Sami","Lunda","Luo","Luxembourgish","Luyia","Maba","Macedonian","Machame","Madurese","Mafa","Magahi","Main-Franconian","Maithili","Makasar","Makhuwa-Meetto","Makonde","Malagasy","Malay","Malayalam","Maltese","Manchu","Mandar","Mandingo","Manipuri","Manx","Maori","Mapuche","Marathi","Mari","Marshallese","Marwari","Masai","Mazanderani","Medumba","Mende","Mentawai","Meru","Metaʼ","Mexican Spanish","Micmac","Middle Dutch","Middle English","Middle French","Middle High German","Middle Irish","Min Nan Chinese","Minangkabau","Mingrelian","Mirandese","Mizo","Modern Standard Arabic","Mohawk","Moksha","Moldavian","Mongo","Mongolian","Morisyen","Moroccan Arabic","Mossi","Multiple Languages","Mundang","Muslim Tat","Myene","Nama","Nauru","Navajo","Ndonga","Neapolitan","Nepali","Newari","Ngambay","Ngiemboon","Ngomba","Nheengatu","Nias","Niuean","No linguistic content","Nogai","North Ndebele","Northern Frisian","Northern Sami","Northern Sotho","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Novial","Nuer","Nyamwezi","Nyanja","Nyankole","Nyasa Tonga","Nyoro","Nzima","NʼKo","Occitan","Ojibwa","Old English","Old French","Old High German","Old Irish","Old Norse","Old Persian","Old Provençal","Oriya","Oromo","Osage","Ossetic","Ottoman Turkish","Pahlavi","Palatine German","Palauan","Pali","Pampanga","Pangasinan","Papiamento","Pashto","Pennsylvania German","Persian","Phoenician","Picard","Piedmontese","Plautdietsch","Pohnpeian","Polish","Pontic","Portuguese","Prussian","Punjabi","Quechua","Rajasthani","Rapanui","Rarotongan","Riffian","Romagnol","Romanian","Romansh","Romany","Rombo","Root","Rotuman","Roviana","Rundi","Russian","Rusyn","Rwa","Saho","Sakha","Samaritan Aramaic","Samburu","Samoan","Samogitian","Sandawe","Sango","Sangu","Sanskrit","Santali","Sardinian","Sasak","Sassarese Sardinian","Saterland Frisian","Saurashtra","Scots","Scottish Gaelic","Selayar","Selkup","Sena","Seneca","Serbian","Serbo-Croatian","Serer","Seri","Shambala","Shan","Shona","Sichuan Yi","Sicilian","Sidamo","Siksika","Silesian","Simplified Chinese","Sindhi","Sinhala","Skolt Sami","Slave","Slovak","Slovenian","Soga","Sogdien","Somali","Soninke","South Azerbaijani","South Ndebele","Southern Altai","Southern Sami","Southern Sotho","Spanish","Sranan Tongo","Standard Moroccan Tamazight","Sukuma","Sumerian","Sundanese","Susu","Swahili","Swati","Swedish","Swiss French","Swiss German","Swiss High German","Syriac","Tachelhit","Tagalog","Tahitian","Taita","Tajik","Talysh","Tamashek","Tamil","Taroko","Tasawaq","Tatar","Telugu","Tereno","Teso","Tetum","Thai","Tibetan","Tigre","Tigrinya","Timne","Tiv","Tlingit","Tok Pisin","Tokelau","Tongan","Tornedalen Finnish","Traditional Chinese","Tsakhur","Tsakonian","Tsimshian","Tsonga","Tswana","Tulu","Tumbuka","Tunisian Arabic","Turkish","Turkmen","Turoyo","Tuvalu","Tuvinian","Twi","Tyap","Udmurt","Ugaritic","Ukrainian","Umbundu","Unknown Language","Upper Sorbian","Urdu","Uyghur","Uzbek","Vai","Venda","Venetian","Veps","Vietnamese","Volapük","Võro","Votic","Vunjo","Walloon","Walser","Waray","Warlpiri","Washo","Wayuu","Welsh","West Flemish","Western Frisian","Western Mari","Wolaytta","Wolof","Wu Chinese","Xhosa","Xiang Chinese","Yangben","Yao","Yapese","Yemba","Yiddish","Yoruba","Zapotec","Zarma","Zaza","Zeelandic","Zenaga","Zhuang","Zoroastrian Dari","Zulu","Zuni"];

const initialForm = {
  fullName: "",
  fatherName: "",
  headline: "",
  email: "",
  countryCode: "+91",
  mobile: "",
  dateOfBirth: "",
  gender: "Male",
  aadharNumber: "",
  streetAddress: "",
  areaLocality: "",
  country: "India",
  pincode: "",
  currentCity: "",
  jobTitle: "",
  companyName: "",
  totalExperience: "",
  currentCTC: "",
  keyResponsibilities: "",
  highestQualification: "",
  collegeName: "",
  yearOfPassing: "",
  keySkills: "",
  tools: "",
  languages: "",
  preferredJobTitles: "",
  preferredLocations: "",
  expectedCTC: "",
  noticePeriod: "",
  preferredIndustries: "",
  preferredEmploymentTypes: "",
  preferredWorkTypes: "",
  howSoonReady: "",
};

const mapStaticOptions = (data: any): { value: string; label: string }[] => {
  if (!data) return [];
  const list = data.data || data.items || data.skills || data.tools || data;
  if (!Array.isArray(list)) return [];
  return list
    .map((item: any) => {
      if (typeof item === "string") {
        return { value: item, label: item };
      }
      if (item && typeof item === "object") {
        const value = item.value || item.id || item.slug || item.name || "";
        const label = item.label || item.name || item.title || item.value || "";
        if (!value || !label) return null;
        return { value, label };
      }
      return null;
    })
    .filter(Boolean) as { value: string; label: string }[];
};

/** Empty is valid; if provided, must be exactly 12 digits (numbers only). */
function isValidOptionalAadhar(value: string): boolean {
  const v = (value ?? "").trim();
  if (!v) return true;
  return /^\d{12}$/.test(v);
}

/** Avoid "[object Object]" when API returns languages as objects or react-select value is non-string. */
function normalizeLanguagesFromApi(input: unknown): string {
  if (input == null) return "";
  if (typeof input === "string") return input;
  if (Array.isArray(input)) {
    const parts = input
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          const o = item as Record<string, unknown>;
          const label = o.label ?? o.name ?? o.language ?? o.title;
          if (typeof label === "string" && label.trim()) return label.trim();
          const val = o.value;
          if (typeof val === "string" && val.trim()) return val.trim();
        }
        return "";
      })
      .filter(Boolean);
    return parts.join(", ");
  }
  return "";
}

function languageOptionToString(opt: { value: unknown; label: unknown }): string {
  const pickString = (x: unknown): string => {
    if (typeof x === "string") return x.trim();
    if (x != null && typeof x === "object") {
      const o = x as Record<string, unknown>;
      const candidates = [
        o.label,
        o.name,
        o.language,
        o.title,
        o.value,
        o.text,
        (o as any).labelText,
      ];
      for (const c of candidates) {
        if (typeof c === "string" && c.trim()) return c.trim();
      }
    }
    return "";
  };

  // Prefer label if possible, since that's usually what should display in the pill.
  const fromLabel = pickString(opt.label);
  if (fromLabel) return fromLabel;

  const fromValue = pickString(opt.value);
  if (fromValue) return fromValue;

  return "";
}

export default function ProfileV2Page() {
  const router = useRouter();
  const { userCredentials, setUserCredentials } = useUser();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [employmentDropdownOpen, setEmploymentDropdownOpen] = useState(false);
  const [languageOptions, setLanguageOptions] = useState<
    { value: string; label: string }[]
  >(COMMON_LANGUAGES.map((lang) => ({ value: lang, label: lang })));
  const [skillOptions, setSkillOptions] = useState<{ value: string; label: string }[]>([]);
  const [toolOptions, setToolOptions] = useState<{ value: string; label: string }[]>([]);
  const [aadharError, setAadharError] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  const [cityHighlightedIndex, setCityHighlightedIndex] = useState(-1);

  // Keep CreatableSelect in sync with form.languages so adding one language
  // never drops the previously selected ones.
  const selectedLanguageOptions =
    form.languages
      ? form.languages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((lang) => ({ value: lang, label: lang }))
      : [];

  // Ensure react-select recognizes currently selected languages as options.
  // Otherwise, onCreate/onChange may drop existing selections.
  useEffect(() => {
    if (!selectedLanguageOptions.length) return;
    setLanguageOptions((prev) => {
      const existing = new Set(prev.map((o) => o.value));
      const additions = selectedLanguageOptions
        .map((opt) => opt.value)
        .filter((v) => v && !existing.has(v))
        .map((v) => ({ value: v, label: v }));
      return additions.length ? [...prev, ...additions] : prev;
    });
    // Intentionally depend only on the string values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguageOptions.map((o) => o.value).join("|")]);

  const selectedToolOptions =
    form.tools
      ? form.tools
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((t) => ({ value: t, label: t }))
      : [];

  // Keep CreatableSelect tool options in sync with saved tools (same idea as languages).
  useEffect(() => {
    if (!selectedToolOptions.length) return;
    setToolOptions((prev) => {
      const existing = new Set(prev.map((o) => o.value));
      const additions = selectedToolOptions
        .map((opt) => opt.value)
        .filter((v) => v && !existing.has(v))
        .map((v) => ({ value: v, label: v }));
      return additions.length ? [...prev, ...additions] : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToolOptions.map((o) => o.value).join("|")]);

  // If user is not logged in (no token/credentials in storage), redirect them to login
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hasAccessToken = !!localStorage.getItem("accessToken");
      const hasStoredCreds = !!localStorage.getItem("userCredentials");
      if (!hasAccessToken && !hasStoredCreds) {
        const redirectPath = "/profile";
        router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      }
    } catch (e) {
      // If storage is unavailable, fail closed and route to login
      const redirectPath = "/profile";
      router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [router]);

  useEffect(() => {
    const loadStaticSkillAndToolOptions = async () => {
      try {
        const [skillsResp, toolsResp] = await Promise.all([
          getStaticSkills(""),
          getStaticTools(""),
        ]);

        const skillOpts = mapStaticOptions(skillsResp);
        if (skillOpts.length) setSkillOptions(skillOpts);

        const toolOpts = mapStaticOptions(toolsResp);
        if (toolOpts.length) setToolOptions(toolOpts);
      } catch (err) {
        console.error("Failed to load static skills/tools", err);
      }
    };

    loadStaticSkillAndToolOptions();
  }, []);

  // Re-fetch static tools when profile context is ready so the dropdown is populated like skills
  // (avoids empty options if the initial mount request failed or returned late).
  useEffect(() => {
    if (!userCredentials) return;
    let cancelled = false;
    (async () => {
      try {
        const toolsResp = await getStaticTools("");
        const toolOpts = mapStaticOptions(toolsResp);
        if (cancelled || !toolOpts.length) return;
        setToolOptions((prev) => {
          const existing = new Set(prev.map((o) => o.value));
          const additions = toolOpts.filter((o) => !existing.has(o.value));
          return additions.length ? [...prev, ...additions] : prev;
        });
      } catch (err) {
        console.error("Failed to load static tools after profile load", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userCredentials]);

  useEffect(() => {
    if (!userCredentials) return;
    const p = userCredentials.profile as Record<string, unknown>;
    const pro = (p?.professionalInformation as Record<string, unknown>) || {};
    const addr = (p?.address as Record<string, unknown>) || {};
    const workExp =
      (pro.workExperience as Array<Record<string, unknown>>) || [];
    const firstExp = workExp[0] || {};
    const edu = (pro.education as Array<Record<string, unknown>>) || [];
    const firstEdu = edu[0] || {};
    const rawMobile = (userCredentials.mobile as string) ?? "";
    const mobileMatch = rawMobile.match(/^(\+\d{1,4})(.*)$/);
    const loadedCode = mobileMatch ? mobileMatch[1] : "+91";
    const loadedNumber = mobileMatch
      ? mobileMatch[2].replace(/\D/g, "")
      : rawMobile.replace(/\D/g, "");

    const dobSource = (p?.dateOfBirth as string) ?? "";
    const dob =
      dobSource && typeof dobSource === "string"
        ? dobSource.substring(0, 10)
        : "";

    const existingResumeUrl =
      (p?.resumeUrl as string) ||
      ((userCredentials as any)?.resumeUrl as string) ||
      "";
    const existingFileName = existingResumeUrl
      ? existingResumeUrl.split("/").pop() || "Resume.pdf"
      : "";

    setResumeUrl(existingResumeUrl);
    setResumeFileName(existingFileName);

    setForm({
      fullName: (userCredentials.name as string) ?? "",
      fatherName: (p as any)?.fatherName ?? "",
      headline: (p?.bio as string) ?? "",
      email: (userCredentials.email as string) ?? "",
      countryCode: COUNTRY_CODES.some((c) => c.code === loadedCode)
        ? loadedCode
        : "+91",
      mobile: loadedNumber,
      dateOfBirth: dob,
      gender: (p?.gender as string) || "Male",
      aadharNumber: (p as any)?.aadharNumber ?? "",
      streetAddress: (addr?.street as string) ?? "",
      areaLocality: (addr as any)?.areaLocality ?? "",
      country: (addr?.country as string) ?? "India",
      pincode: (addr?.zipCode as string) ?? "",
      currentCity: (addr?.city as string) ?? "",
      jobTitle: (pro.currentJobTitle as string) ?? (firstExp.role as string) ?? "",
      companyName: (firstExp.company as string) ?? "",
      totalExperience: pro.experience != null ? String(pro.experience) : "",
      currentCTC: (pro.expectedSalaryAnnual as string) ?? "",
      keyResponsibilities: (firstExp.description as string) ?? "",
      highestQualification: (firstEdu.degree as string) ?? "",
      collegeName: (firstEdu.institution as string) ?? "",
      yearOfPassing: (firstEdu.year as string) ?? "",
      keySkills: Array.isArray(p?.skills) ? (p.skills as string[]).join(", ") : "",
      tools: (() => {
        const profileTools = p?.tools;
        const proTools = (pro as any)?.tools;
        if (Array.isArray(profileTools)) {
          return (profileTools as string[]).join(", ");
        }
        if (typeof profileTools === "string" && profileTools.trim()) {
          return profileTools;
        }
        if (Array.isArray(proTools)) {
          return (proTools as string[]).join(", ");
        }
        return typeof proTools === "string" ? proTools : "";
      })(),
      languages: normalizeLanguagesFromApi(p?.languages),
      preferredJobTitles: (p?.preferredJobRole as string) ?? "",
      preferredLocations: Array.isArray(p?.prefJobLocations)
        ? (p.prefJobLocations as string[]).join(", ")
        : "",
      expectedCTC: (pro.expectedSalaryAnnual as string) ?? "",
      noticePeriod: (pro.noticePeriod as string) ?? "",
      preferredIndustries: (() => {
        const fromProfile = (p as any)?.preferredIndustries;
        if (Array.isArray(fromProfile)) {
          return (fromProfile as string[]).join(", ");
        }
        if (typeof fromProfile === "string" && fromProfile.trim()) {
          return fromProfile;
        }
        if (Array.isArray((pro as any)?.preferredJobCategories)) {
          return ((pro as any).preferredJobCategories as string[]).join(", ");
        }
        return "";
      })(),
      preferredEmploymentTypes: Array.isArray((pro as any)?.preferredEmploymentTypes)
        ? ((pro as any).preferredEmploymentTypes as string[]).join(", ")
        : "",
      preferredWorkTypes: Array.isArray((pro as any)?.preferredWorkTypes)
        ? ((pro as any).preferredWorkTypes as string[]).join(", ")
        : "",
      howSoonReady: ((pro as any)?.howSoonReady as string) ?? "",
    });
  }, [userCredentials]);

  const handleResumeUpload = async (file: File) => {
    if (!userCredentials) {
      toast.error("Please log in to upload your resume.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document (DOC, DOCX).");
      return;
    }

    const candidateId =
      (userCredentials as any).userId ||
      (userCredentials as any)._id ||
      userCredentials.email ||
      "";

    if (!candidateId) {
      toast.error("Missing user id. Please try again after re‑logging.");
      return;
    }

    setIsUploadingResume(true);
    try {
      const url = await uploadResume(file, candidateId);
      if (url) {
        setResumeUrl(url);
        setResumeFileName(file.name);
        setUserCredentials((prev) =>
          prev
            ? {
                ...prev,
                profile: {
                  ...prev.profile,
                  resumeUrl: url,
                },
              }
            : prev
        );
      }
    } catch {
      // toast handled in uploadResume
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleResumeFileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleResumeUpload(file);
    }
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleResumeUpload(file);
    }
  };

  const handleResumeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSave = async () => {
    if (!userCredentials) {
      toast.error("Please log in to save your profile.");
      return;
    }
    if (!isValidOptionalAadhar(form.aadharNumber)) {
      setAadharError("Enter exactly 12 digits, or leave blank.");
      toast.error("Aadhar number must be exactly 12 digits, or leave it empty.");
      return;
    }
    setAadharError("");
    setSaving(true);
    try {
      const skillsArray = form.keySkills
        ? form.keySkills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const locationsArray = form.preferredLocations
        ? form.preferredLocations.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const languagesArray = form.languages
        ? form.languages.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const languagesObjectsArray =
        languagesArray.length > 0
          ? languagesArray.map((langName) => ({
              name: langName,
              write: true,
              speak: true,
              read: true,
            }))
          : [];
      const toolsArray = form.tools
        ? form.tools.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const industriesArray = form.preferredIndustries
        ? form.preferredIndustries.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const employmentTypesArray = form.preferredEmploymentTypes
        ? form.preferredEmploymentTypes.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const workTypesArray = form.preferredWorkTypes
        ? form.preferredWorkTypes.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const payload = {
        name: (form.fullName || userCredentials?.name) ?? "",
        email: (form.email || userCredentials?.email) ?? "",
        mobile: form.mobile ? `${form.countryCode}${form.mobile}` : "",
        avatar: userCredentials?.avatar ?? "",
        profile: {
          ...(userCredentials?.profile ?? {}),
          bio: form.headline,
          preferredJobRole: form.preferredJobTitles || form.jobTitle,
          fatherName: form.fatherName || (userCredentials?.profile as any)?.fatherName,
          dateOfBirth: form.dateOfBirth || (userCredentials?.profile as any)?.dateOfBirth,
          gender: form.gender || (userCredentials?.profile as any)?.gender,
          aadharNumber: form.aadharNumber || (userCredentials?.profile as any)?.aadharNumber,
          resumeUrl: resumeUrl || (userCredentials?.profile as any)?.resumeUrl,
          skills: skillsArray.length
            ? skillsArray
            : userCredentials?.profile?.skills ?? [],
          tools: toolsArray.length
            ? toolsArray
            : (((userCredentials?.profile as any)?.tools as string[]) ?? []),
          prefJobLocations: locationsArray.length
            ? locationsArray
            : (userCredentials?.profile?.prefJobLocations ?? []),
          preferredIndustries: (() => {
            const raw = form.preferredIndustries.trim();
            if (raw) return raw;
            const prev = (userCredentials?.profile as any)?.preferredIndustries;
            if (typeof prev === "string") return prev;
            if (Array.isArray(prev)) return (prev as string[]).join(", ");
            return "";
          })(),
          languages:
            languagesObjectsArray.length > 0
              ? languagesObjectsArray
              : Array.isArray(
                  ((userCredentials?.profile as Record<string, unknown>)
                    ?.languages as unknown)
                )
                ? (((userCredentials?.profile as Record<string, unknown>)
                    ?.languages as Array<unknown>)
                    .map((l) => {
                      if (typeof l === "string") {
                        const name = l.trim();
                        if (!name) return null;
                        return { name, write: true, speak: true, read: true };
                      }
                      if (l && typeof l === "object") {
                        const o = l as Record<string, unknown>;
                        const name =
                          (o.name as string) ??
                          (o.language as string) ??
                          (o.label as string) ??
                          (o.title as string) ??
                          "";
                        if (typeof name !== "string" || !name.trim()) return null;
                        return {
                          name: name.trim(),
                          write: (o.write as boolean) ?? true,
                          speak: (o.speak as boolean) ?? true,
                          read: (o.read as boolean) ?? true,
                        };
                      }
                      return null;
                    })
                    .filter(Boolean) as Array<{
                    name: string;
                    write: boolean;
                    speak: boolean;
                    read: boolean;
                  }>)
                : [],
          address: {
            ...userCredentials?.profile?.address,
            street: form.streetAddress || userCredentials?.profile?.address.street,
            city: form.currentCity,
            country: form.country || userCredentials?.profile?.address.country,
            zipCode: form.pincode || userCredentials?.profile?.address.zipCode,
            areaLocality: form.areaLocality || (userCredentials?.profile as any)?.address?.areaLocality,
          },
          professionalInformation: {
            ...(userCredentials?.profile &&
            (userCredentials.profile as Record<string, unknown>)
              .professionalInformation &&
            typeof (userCredentials.profile as Record<string, unknown>)
              .professionalInformation === "object"
              ? ((userCredentials.profile as Record<string, unknown>)
                  .professionalInformation as Record<string, unknown>)
              : {}),
            currentJobTitle: form.jobTitle,
            expectedSalaryAnnual: form.expectedCTC || form.currentCTC,
            experience: form.totalExperience
              ? parseInt(form.totalExperience, 10)
              : 0,
            noticePeriod: form.noticePeriod,
            preferredJobCategories: industriesArray.length
              ? industriesArray
              : (((userCredentials?.profile as any)?.professionalInformation
                  ?.preferredJobCategories) ?? []),
            preferredEmploymentTypes: employmentTypesArray.length
              ? employmentTypesArray
              : (((userCredentials?.profile as any)?.professionalInformation
                  ?.preferredEmploymentTypes) ?? []),
            preferredWorkTypes: workTypesArray.length
              ? workTypesArray
              : (((userCredentials?.profile as any)?.professionalInformation
                  ?.preferredWorkTypes) ?? []),
            skills: skillsArray.length
              ? skillsArray
              : (((userCredentials?.profile as any)?.professionalInformation
                  ?.skills) ?? []),
            tools: toolsArray.length
              ? toolsArray
              : (((userCredentials?.profile as any)?.professionalInformation
                  ?.tools) ?? []),
            howSoonReady:
              form.howSoonReady ||
              ((userCredentials?.profile as any)?.professionalInformation
                ?.howSoonReady ??
                ""),
            workExperience: [
              {
                company: form.companyName,
                role: form.jobTitle,
                description: form.keyResponsibilities,
              },
            ],
            education: [
              {
                degree: form.highestQualification,
                institution: form.collegeName,
                year: form.yearOfPassing,
              },
            ],
          },
        },
      };
      const response = await updateProfile(payload);
      if (response?.success && response?.data?.user) {
        setUserCredentials(response.data.user);
        toast.success("Profile saved successfully.");
      } else {
        toast.error(response?.message || "Failed to save profile.");
      }
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? (err as Error).message : "Failed to save profile.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
        <NavbarV2 pageTitle="My Profile" showPageTitle />

        <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-8 sm:space-y-10">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              Profile & preferences
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              Improve my profile
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              Keep your details up to date so recruiters instantly understand your experience, skills,
              and job preferences.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
              onClick={() => router.push("/dashboard")}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to dashboard
            </Button>
          </div>
        </section>

        {/* Grid layout for profile sections */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
          {/* Left: core details */}
          <div className="space-y-6">
            {/* Personal info */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Basic information</h2>
                  <p className="text-xs text-gray-500">
                    Tell us who you are and how to reach you.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Full name</label>
                  <Input
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Father&apos;s name</label>
                  <Input
                    placeholder="Enter father's name"
                    value={form.fatherName}
                    onChange={(e) => setForm((f) => ({ ...f, fatherName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Headline</label>
                  <Input
                    placeholder="e.g. Sales Executive with 3+ years in B2C"
                    value={form.headline}
                    onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    disabled
                    className="bg-gray-50 cursor-not-allowed border-gray-200 text-gray-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    Mobile number
                  </label>
                  <div className="flex gap-2">
                    <Select
                      value={form.countryCode}
                      disabled
                    >
                      <SelectTrigger className="w-[7.5rem] border-gray-200 bg-gray-50 cursor-not-allowed">
                        <SelectValue>
                          {COUNTRY_CODES.find((c) => c.code === form.countryCode)?.flag} {form.countryCode}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.code} value={country.code} className="cursor-pointer">
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                              <span className="text-gray-500 text-xs">({country.country})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder={form.countryCode === "+91" ? "98765 43210" : "Enter mobile number"}
                      value={form.mobile}
                      disabled
                      maxLength={form.countryCode === "+91" ? 10 : 15}
                      className="flex-1 bg-gray-50 cursor-not-allowed border-gray-200 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Personal details */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Personal details</h2>
                  <p className="text-xs text-gray-500">
                    Basic personal information to complete your profile.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Date of birth</label>
                  <Input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setForm((f) => ({ ...f, dateOfBirth: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Gender</label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs font-medium text-gray-700">
                    Aadhar number (optional)
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    placeholder="12-digit Aadhar number"
                    maxLength={12}
                    aria-invalid={!!aadharError}
                    value={form.aadharNumber}
                    onChange={(e) => {
                      setAadharError("");
                      setForm((f) => ({
                        ...f,
                        aadharNumber: e.target.value.replace(/\D/g, "").slice(0, 12),
                      }));
                    }}
                    onBlur={() => {
                      const v = form.aadharNumber.trim();
                      if (v.length > 0 && v.length !== 12) {
                        setAadharError("Enter exactly 12 digits, or leave blank.");
                      }
                    }}
                    className={
                      aadharError ? "border-red-500 focus-visible:ring-red-500/30" : undefined
                    }
                  />
                  {aadharError ? (
                    <p className="text-xs text-red-600">{aadharError}</p>
                  ) : (
                    <p className="text-xs text-gray-500">12 digits only when provided.</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Location details */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Location details</h2>
                  <p className="text-xs text-gray-500">
                    Your current address to help match nearby roles.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs font-medium text-gray-700">Street address</label>
                  <Input
                    placeholder="Enter street address"
                    value={form.streetAddress}
                    onChange={(e) => setForm((f) => ({ ...f, streetAddress: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Area / locality</label>
                  <Input
                    placeholder="Enter area or locality"
                    value={form.areaLocality}
                    onChange={(e) => setForm((f) => ({ ...f, areaLocality: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Country</label>
                  <Input
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Pincode</label>
                  <Input
                    placeholder="Enter pincode"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pincode: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    City
                  </label>
                  <div className="relative" style={{ zIndex: openCityDropdown ? 30 : "auto" }}>
                    <Input
                      placeholder="Type to search and select city or enter manually"
                      value={citySearch || form.currentCity}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setCitySearch(newValue);
                        setOpenCityDropdown(true);
                        setCityHighlightedIndex(-1);
                        setForm((f) => ({ ...f, currentCity: newValue }));
                      }}
                      onFocus={() => {
                        setOpenCityDropdown(true);
                        setCityHighlightedIndex(-1);
                        if (form.currentCity && !citySearch) {
                          setCitySearch(form.currentCity);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setOpenCityDropdown(false);
                          setCityHighlightedIndex(-1);
                        }, 200);
                      }}
                      className="h-11 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-gray-900 pr-10"
                      onKeyDown={(e) => {
                        const filteredCities = cities
                          .filter(
                            (city) =>
                              !citySearch.trim() ||
                              city.toLowerCase().includes(citySearch.toLowerCase())
                          )
                          .slice(0, 100);

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenCityDropdown(true);
                          setCityHighlightedIndex((prev) =>
                            prev < filteredCities.length - 1 ? prev + 1 : prev
                          );
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setOpenCityDropdown(true);
                          setCityHighlightedIndex((prev) =>
                            prev > 0 ? prev - 1 : -1
                          );
                        } else if (e.key === "Enter") {
                          e.preventDefault();
                          if (
                            cityHighlightedIndex >= 0 &&
                            cityHighlightedIndex < filteredCities.length
                          ) {
                            const selectedCity = filteredCities[cityHighlightedIndex];
                            setForm((f) => ({ ...f, currentCity: selectedCity }));
                            setCitySearch(selectedCity);
                            setOpenCityDropdown(false);
                            setCityHighlightedIndex(-1);
                          } else if (citySearch.trim()) {
                            const manualCity = citySearch.trim();
                            setForm((f) => ({ ...f, currentCity: manualCity }));
                            setCitySearch(manualCity);
                            setOpenCityDropdown(false);
                            setCityHighlightedIndex(-1);
                          }
                        } else if (e.key === "Escape") {
                          setOpenCityDropdown(false);
                          setCityHighlightedIndex(-1);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
                      onClick={() => {
                        setOpenCityDropdown((open) => !open);
                        setCityHighlightedIndex(-1);
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openCityDropdown && (() => {
                      const filteredCities = cities
                        .filter(
                          (city) =>
                            !citySearch.trim() ||
                            city.toLowerCase().includes(citySearch.toLowerCase())
                        )
                        .slice(0, 100);

                      return (
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {citySearch.trim() &&
                            !cities.some(
                              (city) =>
                                city.toLowerCase() === citySearch.trim().toLowerCase()
                            ) && (
                              <div
                                onClick={() => {
                                  const customCity = citySearch.trim();
                                  setForm((f) => ({ ...f, currentCity: customCity }));
                                  setCitySearch(customCity);
                                  setOpenCityDropdown(false);
                                  setCityHighlightedIndex(-1);
                                }}
                                className="cursor-pointer bg-orange-50 hover:bg-orange-100 px-4 py-2 flex items-center gap-2 text-sm"
                              >
                                <Plus className="h-4 w-4 text-orange-600" />
                                <span className="font-medium">
                                  Use &quot;{citySearch.trim()}&quot;
                                </span>
                              </div>
                            )}
                          {filteredCities.length > 0 ? (
                            filteredCities.map((city, index) => (
                              <div
                                key={city}
                                onClick={() => {
                                  setForm((f) => ({ ...f, currentCity: city }));
                                  setCitySearch(city);
                                  setOpenCityDropdown(false);
                                  setCityHighlightedIndex(-1);
                                }}
                                onMouseEnter={() => setCityHighlightedIndex(index)}
                                className={`cursor-pointer px-4 py-2 flex items-center justify-between text-sm ${
                                  index === cityHighlightedIndex
                                    ? "bg-orange-100 text-orange-900"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <span>{city}</span>
                                {form.currentCity === city && (
                                  <Check className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-xs text-gray-500">
                              {citySearch.trim()
                                ? "No matching cities found. You can enter the city manually."
                                : "No cities found. Try typing to search."}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </Card>

            {/* Experience */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Work experience</h2>
                  <p className="text-xs text-gray-500">
                    Highlight your most recent and relevant roles.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Current / last job title</label>
                  <Input
                    placeholder="e.g. Senior Sales Executive"
                    value={form.jobTitle}
                    onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Company name</label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    value={form.companyName}
                    onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Total experience</label>
                  <Input
                    placeholder="e.g. 3.5 years"
                    value={form.totalExperience}
                    onChange={(e) => setForm((f) => ({ ...f, totalExperience: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Current CTC (optional)</label>
                  <Input
                    placeholder="e.g. ₹4.5 LPA"
                    value={form.currentCTC}
                    onChange={(e) => setForm((f) => ({ ...f, currentCTC: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Key responsibilities</label>
                  <Textarea
                    rows={3}
                    placeholder="Describe what you do in your current / last role. e.g. handling inbound leads, field visits, closing monthly targets..."
                    value={form.keyResponsibilities}
                    onChange={(e) => setForm((f) => ({ ...f, keyResponsibilities: e.target.value }))}
                  />
                </div>
              </div>
            </Card>

            {/* Education & skills */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Education & skills</h2>
                  <p className="text-xs text-gray-500">
                    Share your highest qualification, key skills, and languages.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Highest qualification</label>
                  <Input
                    placeholder="e.g. B.Com, BBA, BA, Diploma"
                    value={form.highestQualification}
                    onChange={(e) => setForm((f) => ({ ...f, highestQualification: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">College name</label>
                  <Input
                    placeholder="Enter your college/university name"
                    value={form.collegeName}
                    onChange={(e) => setForm((f) => ({ ...f, collegeName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Year of passing</label>
                  <Input
                    placeholder="e.g. 2022"
                    value={form.yearOfPassing}
                    onChange={(e) => setForm((f) => ({ ...f, yearOfPassing: e.target.value }))}
                  />
                </div>
                <div className="space-y-3 sm:col-span-2">
                  <div className="grid gap-3 lg:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Key skills</label>
                      <CreatableSelect
                        isMulti
                        isSearchable
                        placeholder="e.g. Field sales, cold calling"
                        className="w-full"
                        filterOption={() => true}
                        onInputChange={(input) => {
                          // Fetch skills for every keystroke
                          (async () => {
                            try {
                              const resp = await getStaticSkills(input);
                              const opts = mapStaticOptions(resp);
                              if (opts.length) setSkillOptions(opts);
                            } catch (err) {
                              console.error("Failed to fetch static skills", err);
                            }
                          })();
                          return input;
                        }}
                        options={skillOptions}
                        value={
                          form.keySkills
                            ? form.keySkills.split(",").map((s) => {
                                const trimmed = s.trim();
                                return trimmed
                                  ? { value: trimmed, label: trimmed }
                                  : null;
                              }).filter(Boolean) as { value: string; label: string }[]
                            : []
                        }
                        onChange={(newValue) => {
                          const values = (newValue || []) as { value: string; label: string }[];
                          const labels = values.map((v) => v.label).filter(Boolean);
                          setForm((f) => ({ ...f, keySkills: labels.join(", ") }));

                          // Merge new custom skills into options list
                          setSkillOptions((prev) => {
                            const existing = new Set(prev.map((o) => o.value));
                            const additions = labels
                              .filter((l) => !existing.has(l))
                              .map((l) => ({ value: l, label: l }));
                            return additions.length ? [...prev, ...additions] : prev;
                          });
                        }}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? "#F97316" : "#D1D5DB",
                            boxShadow: state.isFocused
                              ? "0 0 0 2px rgba(249, 115, 22, 0.4)"
                              : "none",
                            "&:hover": {
                              borderColor: state.isFocused ? "#F97316" : "#FB923C",
                            },
                            borderWidth: "1px",
                            borderRadius: "0.5rem",
                            minHeight: "40px",
                            fontSize: "0.875rem",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                              ? "#F97316"
                              : state.isFocused
                              ? "#FED7AA"
                              : "white",
                            color: state.isSelected ? "white" : "#1F2937",
                            "&:active": {
                              backgroundColor: "#FB923C",
                            },
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "rgba(249,115,22,0.08)",
                            borderRadius: "999px",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "#EA580C",
                            fontSize: "0.75rem",
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: "#EA580C",
                            ":hover": {
                              backgroundColor: "rgba(248,113,113,0.12)",
                              color: "#B91C1C",
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Tools & platforms you use</label>
                      <CreatableSelect
                        isMulti
                        isSearchable
                        placeholder="e.g. Salesforce, HubSpot CRM"
                        className="w-full"
                        filterOption={() => true}
                        onInputChange={(input) => {
                          // Fetch tools for every keystroke
                          (async () => {
                            try {
                              const resp = await getStaticTools(input);
                              const opts = mapStaticOptions(resp);
                              if (opts.length) setToolOptions(opts);
                            } catch (err) {
                              console.error("Failed to fetch static tools", err);
                            }
                          })();
                          return input;
                        }}
                        options={toolOptions}
                        value={
                          form.tools
                            ? form.tools.split(",").map((s) => {
                                const trimmed = s.trim();
                                return trimmed
                                  ? { value: trimmed, label: trimmed }
                                  : null;
                              }).filter(Boolean) as { value: string; label: string }[]
                            : []
                        }
                        onChange={(newValue) => {
                          const values = (newValue || []) as { value: string; label: string }[];
                          const labels = values.map((v) => v.label).filter(Boolean);
                          setForm((f) => ({ ...f, tools: labels.join(", ") }));

                          setToolOptions((prev) => {
                            const existing = new Set(prev.map((o) => o.value));
                            const additions = labels
                              .filter((l) => !existing.has(l))
                              .map((l) => ({ value: l, label: l }));
                            return additions.length ? [...prev, ...additions] : prev;
                          });
                        }}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? "#F97316" : "#D1D5DB",
                            boxShadow: state.isFocused
                              ? "0 0 0 2px rgba(249, 115, 22, 0.4)"
                              : "none",
                            "&:hover": {
                              borderColor: state.isFocused ? "#F97316" : "#FB923C",
                            },
                            borderWidth: "1px",
                            borderRadius: "0.5rem",
                            minHeight: "40px",
                            fontSize: "0.875rem",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                              ? "#F97316"
                              : state.isFocused
                              ? "#FED7AA"
                              : "white",
                            color: state.isSelected ? "white" : "#1F2937",
                            "&:active": {
                              backgroundColor: "#FB923C",
                            },
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "rgba(249,115,22,0.08)",
                            borderRadius: "999px",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "#EA580C",
                            fontSize: "0.75rem",
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: "#EA580C",
                            ":hover": {
                              backgroundColor: "rgba(248,113,113,0.12)",
                              color: "#B91C1C",
                            },
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Select Languages
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <CreatableSelect
                      options={languageOptions}
                      isSearchable
                      isMulti
                      placeholder="Select a language to add"
                      className="w-full"
                      value={selectedLanguageOptions}
                      components={{
                        // Hide selected chips inside the control; we show them below instead
                        MultiValue: () => null,
                      }}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderColor: state.isFocused ? "#F97316" : "#D1D5DB",
                          boxShadow: state.isFocused
                            ? "0 0 0 2px rgba(249, 115, 22, 0.4)"
                            : "none",
                          "&:hover": {
                            borderColor: state.isFocused ? "#F97316" : "#FB923C",
                          },
                          borderWidth: "1px",
                          borderRadius: "0.75rem",
                          minHeight: "42px",
                          fontSize: "0.875rem",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#F97316"
                            : state.isFocused
                            ? "#FED7AA"
                            : "white",
                          color: state.isSelected ? "white" : "#1F2937",
                          "&:active": {
                            backgroundColor: "#FB923C",
                          },
                        }),
                      }}
                      onChange={(selectedOptions) => {
                        const values = Array.isArray(selectedOptions)
                          ? selectedOptions
                              .map((opt) => languageOptionToString(opt))
                              .filter(Boolean)
                          : [];
                        setForm((f) => ({
                          ...f,
                          languages: values.join(", "),
                        }));
                      }}
                      onCreateOption={(inputValue) => {
                        const trimmed = inputValue.trim();
                        if (!trimmed) return;
                        const newOption = { value: trimmed, label: trimmed };
                        // Only update available options; the selected value comes from onChange.
                        setLanguageOptions((prev) => {
                          const exists = prev.some((p) => p.value === trimmed);
                          return exists ? prev : [...prev, newOption];
                        });
                      }}
                    />
                  </div>
                  {form.languages && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.languages
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((lang) => (
                          <span
                            key={lang}
                            className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 text-xs font-medium"
                          >
                            {lang}
                            <button
                              type="button"
                              className="ml-1 text-[10px] hover:text-red-500"
                              onClick={() =>
                                setForm((f) => {
                                  const filtered = f.languages
                                    .split(",")
                                    .map((x) => x.trim())
                                    .filter(Boolean)
                                    .filter((x) => x !== lang);
                                  return {
                                    ...f,
                                    languages: filtered.join(", "),
                                  };
                                })
                              }
                              aria-label={`Remove ${lang}`}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right: resume first, then preferences */}
          <aside className="space-y-6">
            {/* Resume upload */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Resume</h2>
                  <p className="text-xs text-gray-500">
                    Upload your latest resume so recruiters get the full picture.
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl border border-dashed border-gray-300 bg-gray-50/60 px-4 py-6 text-center space-y-3 cursor-pointer"
                onClick={() => resumeInputRef.current?.click()}
                onDragOver={handleResumeDragOver}
                onDrop={handleResumeDrop}
              >
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeFileInput}
                />

                {resumeUrl ? (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-800">
                      Current resume
                    </p>
                    <p className="text-xs text-gray-700 truncate">
                      {resumeFileName || "Resume.pdf"}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Click to replace or drag a new file.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-gray-600">
                      Drag & drop your resume here, or click to browse.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-white text-xs gap-1.5"
                      disabled={isUploadingResume}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {isUploadingResume ? "Uploading..." : "Choose file"}
                    </Button>
                    <p className="text-[11px] text-gray-400">
                      Supported formats: PDF, DOC, DOCX · Max 5MB
                    </p>
                  </>
                )}
              </div>
            </Card>

            {/* Job preferences */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Job preferences</h2>
                  <p className="text-xs text-gray-500">
                    Tell us what kind of role you&apos;re looking for.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Preferred industries & job categories
                  </label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. BFSI sales, Ed-tech inside sales, Customer support"
                    value={form.preferredIndustries}
                    onChange={(e) => setForm((f) => ({ ...f, preferredIndustries: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Preferred job titles</label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Sales Executive, Business Development Executive, Customer Support"
                    value={form.preferredJobTitles}
                    onChange={(e) => setForm((f) => ({ ...f, preferredJobTitles: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Preferred locations</label>
                  <Input
                    placeholder="e.g. Bengaluru, Mumbai, Remote"
                    value={form.preferredLocations}
                    onChange={(e) => setForm((f) => ({ ...f, preferredLocations: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Expected CTC</label>
                  <Input
                    placeholder="e.g. ₹5.5 LPA"
                    value={form.expectedCTC}
                    onChange={(e) => setForm((f) => ({ ...f, expectedCTC: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">
                    Preferred Employment Types *
                  </label>
                  <Popover
                    open={employmentDropdownOpen}
                    onOpenChange={setEmploymentDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={employmentDropdownOpen}
                        className="h-12 w-full justify-between rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium hover:bg-white/80 text-left"
                      >
                        <span className="text-gray-500">
                          {form.preferredEmploymentTypes
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean).length > 0
                            ? `${
                                form.preferredEmploymentTypes
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean).length
                              } employment type(s) selected`
                            : "Select employment types..."}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search employment types..."
                          className="h-9 text-sm"
                        />
                        <CommandEmpty>No employment types found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {EMPLOYMENT_TYPE_OPTIONS.map((type) => {
                              const selected = form.preferredEmploymentTypes
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .includes(type);
                              return (
                                <CommandItem
                                  key={type}
                                  value={type}
                                  onSelect={() => {
                                    setForm((f) => {
                                      const parts = f.preferredEmploymentTypes
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean);
                                      const has = parts.includes(type);
                                      const next = has
                                        ? parts.filter((p) => p !== type)
                                        : [...parts, type];
                                      return {
                                        ...f,
                                        preferredEmploymentTypes: next.join(", "),
                                      };
                                    });
                                  }}
                                  className="cursor-pointer text-sm"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{type}</span>
                                    {selected && (
                                      <Check className="h-4 w-4 text-orange-600" />
                                    )}
                                  </div>
                                </CommandItem>
                              );
                            })}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Preferred work types *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["remote", "hybrid", "on-site"].map((type) => {
                      const checked = form.preferredWorkTypes
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .includes(type);
                      return (
                        <label
                          key={type}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) => {
                              setForm((f) => {
                                const parts = f.preferredWorkTypes
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                const has = parts.includes(type);
                                let next = parts;
                                if (value && !has) {
                                  next = [...parts, type];
                                } else if (!value && has) {
                                  next = parts.filter((p) => p !== type);
                                }
                                return {
                                  ...f,
                                  preferredWorkTypes: next.join(", "),
                                };
                              });
                            }}
                          />
                          <span className="capitalize">{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    How soon are you ready to start? (optional)
                  </label>
                  <Input
                    placeholder="e.g. Immediately, 15 days, 30 days"
                    value={form.howSoonReady}
                    onChange={(e) => setForm((f) => ({ ...f, howSoonReady: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Notice period</label>
                  <Input
                    placeholder="e.g. Immediate, 15 days, 30 days"
                    value={form.noticePeriod}
                    onChange={(e) => setForm((f) => ({ ...f, noticePeriod: e.target.value }))}
                  />
                </div>
              </div>
            </Card>

            {/* Save CTA */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </aside>
        </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

