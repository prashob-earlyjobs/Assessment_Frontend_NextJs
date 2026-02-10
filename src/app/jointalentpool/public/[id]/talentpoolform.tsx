"use client"
import type React from "react";
import { toast } from "react-hot-toast";
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../components/ui/command";
import { Plus, X, UploadCloud, ArrowRight, ArrowLeft, ArrowLeftCircle, User, Briefcase, CheckCircle,XCircle, MapPin, Phone, Mail, Calendar, FileText, Languages, Award, Target, Building, Clock, Loader2, Search, ChevronDown, Check, Eye, DollarSign, Zap } from 'lucide-react';
import { ILocationDetails } from "../../../components/services/candidateapi";
//import { useNavigate } from "react-router-dom";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/pages/navbar";
import Footer from "@/app/components/pages/footer";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Job interface for API response
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  workType?: string;
  id?: string;
}

interface GetJobsResponse {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
}

// Update the CandidateFormData interface to match backend expectations
interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string; // Made optional
  highestQualification: string;
  currentLocationDetails: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    fullAddress: string;
  };
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  preferredJobCategories: string[];
  preferredEmploymentTypes: string[];
  preferredWorkTypes: ('remote' | 'hybrid' | 'on-site')[];
  howSoonReady?: string;
  preferredJobLocations: string[];
  expectedSalary?: number;
}

interface AddCandidateFormProps {
  // Required API functions
  onSubmitForm: (id: string | undefined, data: ICreateTallentPoolFormData, resumeFile?: File) => Promise<any>;
  uploadResumeFile: (file: File, fileName: string) => Promise<{ fileUrl: string }>;
  generateResumeContent: (file: File) => Promise<{ data: any }>;
  fetchCitiesByCountry?: (country: string) => Promise<string[]>;
  
  // Optional callbacks
  onSubmit?: (data: CandidateFormData) => void;
  refreshCandidates?: () => void;
  isPublic?: boolean;
  
  // Optional props
  id?: string; // If not provided, will use useParams
  showNavbar?: boolean; // Default true
  showFooter?: boolean; // Default true
  NavbarComponent?: React.ComponentType;
  FooterComponent?: React.ComponentType;
}

export interface ICreateTallentPoolFormData {
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string;
  highestQualification: string;
  currentLocationDetails: ILocationDetails;
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  preferredJobCategories: string[];
  preferredEmploymentTypes: string[];
  preferredWorkTypes: ('remote' | 'hybrid' | 'on-site')[];
  howSoonReady?: string;
  preferredJobLocations?: string[];
  expectedSalary?: number;
  resume?: string;
}

export default function PublicTalentPoolForm({ 
  onSubmitForm,
  uploadResumeFile,
  generateResumeContent,
  fetchCitiesByCountry,
  onSubmit,
  refreshCandidates,
  id: propId,
  showNavbar = true,
  showFooter = true,
  NavbarComponent = Navbar,
  FooterComponent = Footer
}: AddCandidateFormProps) {
  //const navigate = useNavigate();
  const params = useParams<{ id?: string; candidateId?: string }>();
  const id = propId || params.id || params.candidateId;
  const formTopRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "Male",
    aadharNumber: "",
    highestQualification: "",
    currentLocationDetails: {
      street: "",
      area: "",
      city: "",
      pincode: "",
      fullAddress: "",
    },
    spokenLanguages: [],
    totalExperienceYears: 0,
    totalExperienceMonths: 0,
    skills: [],
    preferredJobCategories: [],
    preferredEmploymentTypes: [],
    preferredWorkTypes: [],
    howSoonReady: "",
    preferredJobLocations: [],
    expectedSalary: undefined,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentJobCategory, setCurrentJobCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentJobLocation, setCurrentJobLocation] = useState("");
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);
  // Local input states to allow clearing and typing freely
  const [experienceYearsInput, setExperienceYearsInput] = useState<string>("");
  const [experienceMonthsInput, setExperienceMonthsInput] = useState<string>("");

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [jobSearchTerm, setJobSearchTerm] = useState("");

  // Searchable dropdown states
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openEmploymentTypeDropdown, setOpenEmploymentTypeDropdown] = useState(false);
  const [openJobLocationDropdown, setOpenJobLocationDropdown] = useState(false);
  const [openSkillsDropdown, setOpenSkillsDropdown] = useState(false);
  const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false);
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  
  // Location states
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [cityHighlightedIndex, setCityHighlightedIndex] = useState(-1);

  // Qualification options with modern names
  const qualificationOptions = [
     // School Levels
  { value: "10th", label: "Secondary Education (10th Grade)" },
  { value: "12th", label: "Higher Secondary Education (12th Grade)" },

  // Vocational
  { value: "ITI", label: "Industrial Training Institute (ITI)" },
  { value: "Diploma", label: "Diploma (Polytechnic)" },
  { value: "Vocational Course", label: "Vocational Training Program" },

  // Undergraduate
  { value: "Graduation (10 + 2 + 3)", label: "Bachelor's Degree (3 Years)" },
  { value: "Graduation (10 + 2 + 4)", label: "Bachelor's Degree (4 Years)" },

  // General PG (Simplified)
  { value: "Post Graduation", label: "Post Graduation (Any Master's Degree)" },
  { value: "Post Diploma", label: "Post Graduate Diploma (PG Diploma)" },
  { value: "Professional PG", label: "Professional Post Graduation (MBA, MCA, etc.)" },

  // Research Degrees
  { value: "MPhil", label: "Master of Philosophy (MPhil)" },
  { value: "PhD", label: "Doctorate (PhD)" },
  { value: "Post Doctorate", label: "Post Doctoral Research" },

  // Professional Certifications
  { value: "CA", label: "Chartered Accountant (CA)" },
  { value: "CMA", label: "Cost Management Accountant (CMA)" },
  { value: "CS", label: "Company Secretary (CS)" },
  { value: "LLB", label: "Bachelor of Law (LLB)" },
  { value: "LLM", label: "Master of Law (LLM)" },
  { value: "MBBS", label: "Bachelor of Medicine (MBBS)" },
  { value: "MD", label: "Doctor of Medicine (MD)" },
  { value: "BDS", label: "Bachelor of Dental Surgery (BDS)" },

  // Other
  { value: "Associate Degree", label: "Associate Degree (2 Year Program)" },
  { value: "No Formal Education", label: "No Formal Education" },
  { value: "Other", label: "Other Qualification" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newFormData = { ...prev } as any;
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        newFormData[parent] = { ...newFormData[parent], [child]: value };
      } else {
        newFormData[field] = value;
      }
      return newFormData as CandidateFormData;
    });

    if (showErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (errors[field]) {
          delete newErrors[field];
        }
        if (field.includes(".")) {
          const [parent, child] = field.split(".");
          delete newErrors[child];
          delete newErrors[`${parent}.${child}`];
        }
        if (field === "currentLocationDetails.city") {
          delete newErrors["city"];
        }
        return newErrors;
      });
    }
  };



  const categoryOptions = [
    'Aviation',
    'Banking',
    'Insurance',
    'Oil And Gas',
    'Retail',
    'Education',
    'Consumer Goods',
    'Manufacturing',
    'Information Technology',
    'Health Care',
    'BPO',
    'ITES',
    'Entertainment',
    'Finance',
    'Textile',
    'Media and news',
    'Food processing',
    'Hospitality',
    'Construction',
    'Law',
    'Advertising',
    'E-commerce',
    'Other'
  ];

  const employmentTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship'
  ];

  const howSoonReadyOptions = [
    'Immediately',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'Within 2 months',
    'Within 3 months',
    'More than 3 months'
  ];

  const commonJobLocations = [
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Patna',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
    'Agra',
    'Nashik',
    'Faridabad',
    'Meerut',
    'Rajkot',
    'Varanasi',
    'Srinagar',
    'Amritsar',
    'Noida',
    'Gurgaon',
    'Remote'
  ];

  const commonSkills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'C++',
    'C#',
    '.NET',
    'PHP',
    'Ruby',
    'Go',
    'Swift',
    'Kotlin',
    'HTML',
    'CSS',
    'SASS',
    'Tailwind CSS',
    'Bootstrap',
    'SQL',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'Git',
    'GitHub',
    'GitLab',
    'CI/CD',
    'Jenkins',
    'Agile',
    'Scrum',
    'Project Management',
    'Digital Marketing',
    'SEO',
    'SEM',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Google Analytics',
    'Data Analysis',
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Excel',
    'Power BI',
    'Tableau',
    'Salesforce',
    'Customer Service',
    'Business Development',
    'Sales',
    'HR',
    'Recruitment',
    'Accounting',
    'Finance',
    'Graphic Design',
    'UI/UX Design',
    'Photoshop',
    'Illustrator',
    'Figma',
    'Adobe XD',
    'Video Editing',
    'Content Writing',
    'Technical Writing',
    'Communication',
    'Leadership',
    'Team Management'
  ];

  const addToArray = (
    fieldName: keyof CandidateFormData,
    item: string,
    setItem: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (
      item.trim() !== "" &&
      Array.isArray(formData[fieldName]) &&
      !(formData[fieldName] as string[]).includes(item.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] as string[]), item.trim()],
      }));
      setItem("");
      if (showErrors && errors[fieldName as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName as string];
          return newErrors;
        });
      }
    }
  };

  const removeFromArray = (fieldName: keyof CandidateFormData, index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[fieldName] as string[])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [fieldName]: newArray,
      };
    });
  };

  // Function to fetch cities for a country
  const fetchCities = async (country: string) => {
    if (!country.trim()) {
      setCities([]);
      return;
    }

    setLoadingCities(true);
    try {
      if (fetchCitiesByCountry) {
        const citiesList = await fetchCitiesByCountry(country);
        setCities(citiesList);
      } else {
        // Fallback to default API if not provided
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
          country: country
        });
        
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setCities(response.data.data);
        } else {
          setCities([]);
        }
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  // Set default country to India on mount
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry("India");
    }
  }, []);

  // Fetch cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchCities(selectedCountry);
    } else {
      setCities([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const handleCategorySelect = (category: string) => {
    if (!formData.preferredJobCategories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        preferredJobCategories: [...prev.preferredJobCategories, category]
      }));
      if (showErrors && errors.preferredJobCategories) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.preferredJobCategories;
          return newErrors;
        });
      }
    }
    setOpenCategoryDropdown(false);
  };

  const handleEmploymentTypeSelect = (type: string) => {
    if (!formData.preferredEmploymentTypes.includes(type)) {
      setFormData((prev) => ({
        ...prev,
        preferredEmploymentTypes: [...prev.preferredEmploymentTypes, type]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredEmploymentTypes: prev.preferredEmploymentTypes.filter(t => t !== type)
      }));
    }
    if (showErrors && errors.preferredEmploymentTypes && formData.preferredEmploymentTypes.length === 0) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.preferredEmploymentTypes;
        return newErrors;
      });
    }
  };

  const handleJobLocationSelect = (location: string) => {
    if (!formData.preferredJobLocations.includes(location)) {
      setFormData((prev) => ({
        ...prev,
        preferredJobLocations: [...prev.preferredJobLocations, location]
      }));
      if (showErrors && errors.preferredJobLocations) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.preferredJobLocations;
          return newErrors;
        });
      }
    } else {
      // Allow removing by clicking again
      setFormData((prev) => ({
        ...prev,
        preferredJobLocations: prev.preferredJobLocations.filter(l => l !== location)
      }));
    }
  };

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resloading, setResloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchResume=async ()=>{
      setResloading(true);

      try{
        if (resumeFile && resumeFileName){
          const response = await uploadResumeFile(resumeFile, resumeFileName);
          console.log(response);
          setUploadedURL(response.fileUrl);
        }
        if(resumeFile){
          const response = await generateResumeContent(resumeFile);
          console.log(response);
          setFormData((prev) => ({
            ...prev,
            ...response.data,
          }));
        }
      }
      catch(e){
        console.log(e);
      }
      finally{
        setResloading(false);
      }
    };
  fetchResume()
    
  },[resumeFile,resumeFileName])


  const commonLanguages = ["Abkhazian","Achinese","Acoli","Adangme","Adyghe","Afar","Afrihili","Afrikaans","Aghem","Ainu","Akan","Akkadian","Akoose","Alabama","Albanian","Aleut","Algerian Arabic","American English","American Sign Language","Amharic","Ancient Egyptian","Ancient Greek","Angika","Ao Naga","Arabic","Aragonese","Aramaic","Araona","Arapaho","Arawak","Armenian","Aromanian","Arpitan","Assamese","Asturian","Asu","Atsam","Australian English","Austrian German","Avaric","Avestan","Awadhi","Aymara","Azerbaijani","Badaga","Bafia","Bafut","Bakhtiari","Balinese","Baluchi","Bambara","Bamun","Banjar","Basaa","Bashkir","Basque","Batak Toba","Bavarian","Beja","Belarusian","Bemba","Bena","Bengali","Betawi","Bhojpuri","Bikol","Bini","Bishnupriya","Bislama","Blin","Blissymbols","Bodo","Bosnian","Brahui","Braj","Brazilian Portuguese","Breton","British English","Buginese","Bulgarian","Bulu","Buriat","Burmese","Caddo","Cajun French","Canadian English","Canadian French","Cantonese","Capiznon","Carib","Catalan","Cayuga","Cebuano","Central Atlas Tamazight","Central Dusun","Central Kurdish","Central Yupik","Chadian Arabic","Chagatai","Chamorro","Chechen","Cherokee","Cheyenne","Chibcha","Chiga","Chimborazo Highland Quichua","Chinese","Chinook Jargon","Chipewyan","Choctaw","Church Slavic","Chuukese","Chuvash","Classical Newari","Classical Syriac","Colognian","Comorian","Congo Swahili","Coptic","Cornish","Corsican","Cree","Creek","Crimean Turkish","Croatian","Czech","Dakota","Danish","Dargwa","Dazaga","Delaware","Dinka","Divehi","Dogri","Dogrib","Duala","Dutch","Dyula","Dzongkha","Eastern Frisian","Efik","Egyptian Arabic","Ekajuk","Elamite","Embu","Emilian","English","Erzya","Esperanto","Estonian","European Portuguese","European Spanish","Ewe","Ewondo","Extremaduran","Fang","Fanti","Faroese","Fiji Hindi","Fijian","Filipino","Finnish","Flemish","Fon","Frafra","French","Friulian","Fulah","Ga","Gagauz","Galician","Gan Chinese","Ganda","Gayo","Gbaya","Geez","Georgian","German","Gheg Albanian","Ghomala","Gilaki","Gilbertese","Goan Konkani","Gondi","Gorontalo","Gothic","Grebo","Greek","Guarani","Gujarati","Gusii","Gwichʼin","Haida","Haitian","Hakka Chinese","Hausa","Hawaiian","Hebrew","Herero","Hiligaynon","Hindi","Hiri Motu","Hittite","Hmong","Hungarian","Hupa","Iban","Ibibio","Icelandic","Ido","Igbo","Iloko","Inari Sami","Indonesian","Ingrian","Ingush","Interlingua","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Jamaican Creole English","Japanese","Javanese","Jju","Jola-Fonyi","Judeo-Arabic","Judeo-Persian","Jutish","Kabardian","Kabuverdianu","Kabyle","Kachin","Kaingang","Kako","Kalaallisut","Kalenjin","Kalmyk","Kamba","Kanembu","Kannada","Kanuri","Kara-Kalpak","Karachay-Balkar","Karelian","Kashmiri","Kashubian","Kawi","Kazakh","Kenyang","Khasi","Khmer","Khotanese","Khowar","Kikuyu","Kimbundu","Kinaray-a","Kinyarwanda","Kirmanjki","Klingon","Kom","Komi","Komi-Permyak","Kongo","Konkani","Korean","Koro","Kosraean","Kotava","Koyra Chiini","Koyraboro Senni","Kpelle","Krio","Kuanyama","Kumyk","Kurdish","Kurukh","Kutenai","Kwasio","Kyrgyz","Kʼicheʼ","Ladino","Lahnda","Lakota","Lamba","Langi","Lao","Latgalian","Latin","Latin American Spanish","Latvian","Laz","Lezghian","Ligurian","Limburgish","Lingala","Lingua Franca Nova","Literary Chinese","Lithuanian","Livonian","Lojban","Lombard","Low German","Lower Silesian","Lower Sorbian","Lozi","Luba-Katanga","Luba-Lulua","Luiseno","Lule Sami","Lunda","Luo","Luxembourgish","Luyia","Maba","Macedonian","Machame","Madurese","Mafa","Magahi","Main-Franconian","Maithili","Makasar","Makhuwa-Meetto","Makonde","Malagasy","Malay","Malayalam","Maltese","Manchu","Mandar","Mandingo","Manipuri","Manx","Maori","Mapuche","Marathi","Mari","Marshallese","Marwari","Masai","Mazanderani","Medumba","Mende","Mentawai","Meru","Metaʼ","Mexican Spanish","Micmac","Middle Dutch","Middle English","Middle French","Middle High German","Middle Irish","Min Nan Chinese","Minangkabau","Mingrelian","Mirandese","Mizo","Modern Standard Arabic","Mohawk","Moksha","Moldavian","Mongo","Mongolian","Morisyen","Moroccan Arabic","Mossi","Multiple Languages","Mundang","Muslim Tat","Myene","Nama","Nauru","Navajo","Ndonga","Neapolitan","Nepali","Newari","Ngambay","Ngiemboon","Ngomba","Nheengatu","Nias","Niuean","No linguistic content","Nogai","North Ndebele","Northern Frisian","Northern Sami","Northern Sotho","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Novial","Nuer","Nyamwezi","Nyanja","Nyankole","Nyasa Tonga","Nyoro","Nzima","NʼKo","Occitan","Ojibwa","Old English","Old French","Old High German","Old Irish","Old Norse","Old Persian","Old Provençal","Oriya","Oromo","Osage","Ossetic","Ottoman Turkish","Pahlavi","Palatine German","Palauan","Pali","Pampanga","Pangasinan","Papiamento","Pashto","Pennsylvania German","Persian","Phoenician","Picard","Piedmontese","Plautdietsch","Pohnpeian","Polish","Pontic","Portuguese","Prussian","Punjabi","Quechua","Rajasthani","Rapanui","Rarotongan","Riffian","Romagnol","Romanian","Romansh","Romany","Rombo","Root","Rotuman","Roviana","Rundi","Russian","Rusyn","Rwa","Saho","Sakha","Samaritan Aramaic","Samburu","Samoan","Samogitian","Sandawe","Sango","Sangu","Sanskrit","Santali","Sardinian","Sasak","Sassarese Sardinian","Saterland Frisian","Saurashtra","Scots","Scottish Gaelic","Selayar","Selkup","Sena","Seneca","Serbian","Serbo-Croatian","Serer","Seri","Shambala","Shan","Shona","Sichuan Yi","Sicilian","Sidamo","Siksika","Silesian","Simplified Chinese","Sindhi","Sinhala","Skolt Sami","Slave","Slovak","Slovenian","Soga","Sogdien","Somali","Soninke","South Azerbaijani","South Ndebele","Southern Altai","Southern Sami","Southern Sotho","Spanish","Sranan Tongo","Standard Moroccan Tamazight","Sukuma","Sumerian","Sundanese","Susu","Swahili","Swati","Swedish","Swiss French","Swiss German","Swiss High German","Syriac","Tachelhit","Tagalog","Tahitian","Taita","Tajik","Talysh","Tamashek","Tamil","Taroko","Tasawaq","Tatar","Telugu","Tereno","Teso","Tetum","Thai","Tibetan","Tigre","Tigrinya","Timne","Tiv","Tlingit","Tok Pisin","Tokelau","Tongan","Tornedalen Finnish","Traditional Chinese","Tsakhur","Tsakonian","Tsimshian","Tsonga","Tswana","Tulu","Tumbuka","Tunisian Arabic","Turkish","Turkmen","Turoyo","Tuvalu","Tuvinian","Twi","Tyap","Udmurt","Ugaritic","Ukrainian","Umbundu","Unknown Language","Upper Sorbian","Urdu","Uyghur","Uzbek","Vai","Venda","Venetian","Veps","Vietnamese","Volapük","Võro","Votic","Vunjo","Walloon","Walser","Waray","Warlpiri","Washo","Wayuu","Welsh","West Flemish","Western Frisian","Western Mari","Wolaytta","Wolof","Wu Chinese","Xhosa","Xiang Chinese","Yangben","Yao","Yapese","Yemba","Yiddish","Yoruba","Zapotec","Zarma","Zaza","Zeelandic","Zenaga","Zhuang","Zoroastrian Dari","Zulu","Zuni"];

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFile(file);
    }
  };

  const clearResume = () => {
    setResumeFileName(null);
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateAadhar = (aadhar: string): boolean => {
    if (!aadhar.trim()) return true; // Aadhar is optional, so empty is valid
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar.replace(/\s/g, ''));
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91|91)?[0-9]{10}$/;
    if (cleanPhone.length === 10) {
      return /^[1-9]\d{9}$/.test(cleanPhone);
    }
    if (cleanPhone.startsWith('+91') && cleanPhone.length === 13) {
      const phoneNumber = cleanPhone.substring(3);
      return /^[2-9]\d{9}$/.test(phoneNumber);
    }
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      const phoneNumber = cleanPhone.substring(2);
      return /^[2-9]\d{9}$/.test(phoneNumber);
    }
    return phoneRegex.test(cleanPhone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age;
      if (actualAge < 16) {
        newErrors.dateOfBirth = "Candidate must be at least 16 years old";
      }
    }
    if (!formData.currentLocationDetails.city.trim()) newErrors.city = "City is required";
    if (formData.spokenLanguages.length === 0) newErrors.spokenLanguages = "At least one language is required";
    if (formData.aadharNumber && !validateAadhar(formData.aadharNumber)) {
      newErrors.aadharNumber = "Please enter a valid 12-digit Aadhar number";
    }
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateStep2 = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    if (!formData.highestQualification.trim()) newErrors.highestQualification = "Educational qualification is required";
    if (formData.totalExperienceYears === undefined || formData.totalExperienceYears < 0) {
      newErrors.totalExperienceYears = "Work experience (years) is required";
    }
    if (formData.totalExperienceMonths === undefined || formData.totalExperienceMonths < 0 || formData.totalExperienceMonths > 11) {
      newErrors.totalExperienceMonths = "Additional months is required and should be between 0-11";
    }
    if (formData.preferredEmploymentTypes.length === 0) newErrors.preferredEmploymentTypes = "At least one employment type is required";
    if (formData.preferredWorkTypes.length === 0) newErrors.preferredWorkTypes = "At least one work type is required";
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateAllFields = () => {
    const step1Validation = validateStep1();
    const step2Validation = validateStep2();
    const combinedErrors = { ...step1Validation.errors, ...step2Validation.errors };
    const isValid = Object.keys(combinedErrors).length === 0;
    return { isValid, errors: combinedErrors };
  };

  // Extract submission logic to a reusable function
  const submitFormData = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const normalizedData: ICreateTallentPoolFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        fatherName: formData.fatherName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        ...(formData.aadharNumber && formData.aadharNumber.trim() && { aadharNumber: formData.aadharNumber }),
        highestQualification: formData.highestQualification,
        currentLocationDetails: formData.currentLocationDetails,
        totalExperienceYears: formData.totalExperienceYears,
        totalExperienceMonths: formData.totalExperienceMonths,
        skills: formData.skills.length > 0 ? formData.skills : ["General"],
        spokenLanguages: formData.spokenLanguages.length > 0 ? formData.spokenLanguages : ["English"],
        preferredJobCategories: formData.preferredJobCategories.length > 0 ? formData.preferredJobCategories : ["General"],
        preferredEmploymentTypes: formData.preferredEmploymentTypes.length > 0 ? formData.preferredEmploymentTypes : ["Full-time"],
        preferredWorkTypes: formData.preferredWorkTypes.length > 0 ? formData.preferredWorkTypes : ["on-site"],
        ...(formData.howSoonReady && formData.howSoonReady.trim() && { howSoonReady: formData.howSoonReady }),
        ...(formData.preferredJobLocations && formData.preferredJobLocations.length > 0 && { preferredJobLocations: formData.preferredJobLocations }),
        ...(formData.expectedSalary && formData.expectedSalary > 0 && { expectedSalary: formData.expectedSalary }),
        resume: uploadedURL || undefined,
      };

      const response = await onSubmitForm(id, normalizedData, resumeFile || undefined);
    
      if(response.status === "success"){
        setSuccessMessage("Your profile has been successfully created! Thank you for registering.");
        setShowSuccessPopup(true);
      }
      else{
        toast.error(response.message);
      }

      if (onSubmit) {
        onSubmit(formData);
      }

      if (refreshCandidates) {
        refreshCandidates();
      }
    } catch (error: any) {
      console.error(":", error.response?.data?.message,error.response?.status);
      if (error.response?.data?.message) {
        if (error.response?.data?.message === "Candidate already exists with the same email or phone number" && error.response?.status === 409) {
          setShowErrorPopup(true);
          setErrorMessage("This email or phone number is already registered. Please use a different email or phone number.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, refreshCandidates, resumeFile, uploadedURL, id, onSubmitForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validation = validateAllFields();
      if (!validation.isValid) {
        setErrors(validation.errors);
        setShowErrors(true);
        const firstErrorField = Object.keys(validation.errors)[0];
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        return;
      }

      await submitFormData();
    },
    [submitFormData]
  );

  const getInputClassName = (fieldName: string, baseClassName: string = "") => {
    const hasError = showErrors && errors[fieldName];
    const errorClasses = hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50" : "";
    const placeholderClasses = "placeholder:text-slate-400 placeholder:opacity-70";
    return `${baseClassName} ${errorClasses} ${placeholderClasses}`.trim();
  };
  const handlePreviewResume = () => {
    if (uploadedURL) {
      try {
        window.open(uploadedURL, '_blank');
      } catch (e) {
        console.error("Error opening resume:", e);
        toast.error("Failed to preview resume. Please try again.");
      }
    } else {
      toast.error("Resume URL not available. Please wait for the upload to complete.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
        {showNavbar && <NavbarComponent />}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-xl rounded-2xl border border-slate-200/80 bg-white w-full" style={{ overflow: 'visible' }}>
            <CardHeader
              className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-slate-200/50 px-8 py-10"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <img
                    src='/images/logo.png'
                    alt="TalentHub Logo"
                    className="h-12 md:h-14 lg:h-16 w-auto"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Talent Pool Registration
                  </CardTitle>
                  <p className="text-slate-600 text-sm md:text-base font-medium">
                    Complete your profile to join our talent pool and unlock career opportunities
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 lg:p-10 space-y-10">
              {/* Resume Upload Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Resume Upload</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Upload your resume to auto-fill form fields (Optional)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-slate-500" />
                    Resume File
                  </Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleResumeUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 h-12 px-6 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-200 w-full sm:w-auto font-medium text-slate-700 hover:text-orange-700"
                    >
                      <UploadCloud className="h-5 w-5 text-orange-600" />
                      <span className="truncate">
                        {resumeFileName ? resumeFileName : "Choose Resume File (Optional)"}
                      </span>
                    </Button>
                   {resumeFileName && (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearResume}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg h-12 px-4"
                          disabled={resloading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handlePreviewResume}
                          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 rounded-lg font-medium h-12 px-4"
                          disabled={resloading || !uploadedURL}
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </>
                    )}
                  </div>
                  {resumeFileName && !resloading && uploadedURL && (
                    <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-emerald-800">{resumeFileName} uploaded successfully</span>
                    </div>
                  )}
                  {resloading && (
                    <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <Loader2 className="h-5 w-5 text-orange-600 animate-spin flex-shrink-0" />
                      <span className="text-sm font-medium text-orange-800">Uploading resume...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Basic Information</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Your personal and contact details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={getInputClassName("name", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                      required
                    />
                    {showErrors && errors.name && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      Father's Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter father's name"
                      className={getInputClassName("fatherName", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors.fatherName && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.fatherName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={getInputClassName("email", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                      required
                    />
                    {showErrors && errors.email && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="10-digit mobile number"
                      className={getInputClassName("phone", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                      required
                    />
                    {showErrors && errors.phone && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Personal Details</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Additional personal information</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={getInputClassName("dateOfBirth", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                      max="2009-08-20"
                      defaultValue="2009-08-20"
                    />
                    {showErrors && errors.dateOfBirth && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">Gender <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value as "Male" | "Female" | "Other")}
                    >
                      <SelectTrigger className="h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      Aadhar Number <span className="text-slate-400 text-xs">(Optional)</span>
                    </Label>
                    <Input
                      id="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                      placeholder="12-digit Aadhar number"
                      className={getInputClassName("aadharNumber", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors.aadharNumber && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.aadharNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Location Details</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Your current address information</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-sm font-semibold text-slate-700">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.currentLocationDetails.street}
                      onChange={(e) => handleInputChange("currentLocationDetails.street", e.target.value)}
                      placeholder="Enter street address"
                      className={getInputClassName("currentLocationDetails.street", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors["currentLocationDetails.street"] && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors["currentLocationDetails.street"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-semibold text-slate-700">Area/Locality</Label>
                    <Input
                      id="area"
                      value={formData.currentLocationDetails.area}
                      onChange={(e) => handleInputChange("currentLocationDetails.area", e.target.value)}
                      placeholder="Enter area or locality"
                      className={getInputClassName("currentLocationDetails.area", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors["currentLocationDetails.area"] && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors["currentLocationDetails.area"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={selectedCountry}
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                        handleInputChange("currentLocationDetails.city", ""); // Clear city when country changes
                        setCitySearch("");
                      }}
                    >
                      <SelectTrigger className={getInputClassName("country", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg max-h-60">
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="Brazil">Brazil</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-semibold text-slate-700">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.currentLocationDetails.pincode}
                      onChange={(e) => handleInputChange("currentLocationDetails.pincode", e.target.value)}
                      placeholder="Enter pincode"
                      className={getInputClassName("currentLocationDetails.pincode", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors["currentLocationDetails.pincode"] && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors["currentLocationDetails.pincode"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    City <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative" style={{ zIndex: openCityDropdown ? 50 : 'auto' }}>
                    <Input
                      id="city"
                      name="nope"
                      autoComplete="new-password"
                      autoCorrect="off"
                      spellCheck="false"
                      value={citySearch}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setCitySearch(newValue);
                        setOpenCityDropdown(true);
                        setCityHighlightedIndex(-1);
                        // Always update city value to allow deletion
                        handleInputChange("currentLocationDetails.city", newValue);
                      }}
                      onFocus={() => {
                        if (selectedCountry) {
                          setOpenCityDropdown(true);
                          setCityHighlightedIndex(-1);
                          // When focusing, if there's a selected city and no search text, populate search with it
                          if (formData.currentLocationDetails.city && citySearch === "") {
                            setCitySearch(formData.currentLocationDetails.city);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        // Delay closing to allow click events on dropdown items
                        setTimeout(() => {
                          setOpenCityDropdown(false);
                          setCityHighlightedIndex(-1);
                          // citySearch and city value are already synced in onChange, so no need to update here
                          // If citySearch is empty, the city value is already empty from onChange
                        }, 200);
                      }}
                      placeholder={selectedCountry ? "Type to search and select city or enter manually" : "Please select a country first"}
                      disabled={!selectedCountry}
                      className={getInputClassName("city", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900 pr-10")}
                      onKeyDown={(e) => {
                        const filteredCities = cities
                          .filter(city => 
                            !citySearch.trim() || 
                            city.toLowerCase().includes(citySearch.toLowerCase())
                          )
                          .slice(0, 100);

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenCityDropdown(true);
                          setCityHighlightedIndex(prev => 
                            prev < filteredCities.length - 1 ? prev + 1 : prev
                          );
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setOpenCityDropdown(true);
                          setCityHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                        } else if (e.key === "Enter") {
                          e.preventDefault();
                          if (cityHighlightedIndex >= 0 && cityHighlightedIndex < filteredCities.length) {
                            const selectedCity = filteredCities[cityHighlightedIndex];
                            handleInputChange("currentLocationDetails.city", selectedCity);
                            setCitySearch(selectedCity);
                            setOpenCityDropdown(false);
                            setCityHighlightedIndex(-1);
                            if (showErrors && errors.city) {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.city;
                                return newErrors;
                              });
                            }
                          } else {
                            // If no item is highlighted, use the typed value (manual entry)
                            if (citySearch.trim()) {
                              const manualCity = citySearch.trim();
                              handleInputChange("currentLocationDetails.city", manualCity);
                              setCitySearch(manualCity);
                              setOpenCityDropdown(false);
                              setCityHighlightedIndex(-1);
                              if (showErrors && errors.city) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors.city;
                                  return newErrors;
                                });
                              }
                            }
                          }
                        } else if (e.key === "Escape") {
                          setOpenCityDropdown(false);
                          setCityHighlightedIndex(-1);
                        }
                      }}
                    />
                    {selectedCountry && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 focus:outline-none z-10"
                        onClick={() => {
                          setOpenCityDropdown(!openCityDropdown);
                          setCityHighlightedIndex(-1);
                        }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* City Dropdown */}
                    {openCityDropdown && selectedCountry && (() => {
                      const filteredCities = cities
                        .filter(city => 
                          !citySearch.trim() || 
                          city.toLowerCase().includes(citySearch.toLowerCase())
                        )
                        .slice(0, 100);

                      return (
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {loadingCities ? (
                            <div className="px-4 py-2 text-sm text-slate-500 flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading cities...
                            </div>
                          ) : (
                            <>
                              {/* Show custom city option if typed value doesn't match any existing city */}
                              {citySearch.trim() && 
                               !cities.some(city => 
                                 city.toLowerCase() === citySearch.trim().toLowerCase()
                               ) && (
                                <div
                                  onClick={() => {
                                    const customCity = citySearch.trim();
                                    handleInputChange("currentLocationDetails.city", customCity);
                                    setCitySearch(customCity);
                                    setOpenCityDropdown(false);
                                    setCityHighlightedIndex(-1);
                                    if (showErrors && errors.city) {
                                      setErrors((prev) => {
                                        const newErrors = { ...prev };
                                        delete newErrors.city;
                                        return newErrors;
                                      });
                                    }
                                  }}
                                  className="cursor-pointer bg-orange-50 hover:bg-orange-100 px-4 py-2 flex items-center gap-2"
                                >
                                  <Plus className="h-4 w-4 text-orange-600" />
                                  <span className="font-medium">Use "{citySearch.trim()}"</span>
                                </div>
                              )}
                              
                              {/* Show filtered cities from API */}
                              {filteredCities.length > 0 ? (
                                filteredCities.map((city, index) => (
                                  <div
                                    key={city}
                                    ref={(el) => {
                                      if (el && index === cityHighlightedIndex) {
                                        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                      }
                                    }}
                                    onClick={() => {
                                      handleInputChange("currentLocationDetails.city", city);
                                      setCitySearch(city);
                                      setOpenCityDropdown(false);
                                      setCityHighlightedIndex(-1);
                                      if (showErrors && errors.city) {
                                        setErrors((prev) => {
                                          const newErrors = { ...prev };
                                          delete newErrors.city;
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    onMouseEnter={() => setCityHighlightedIndex(index)}
                                    className={`cursor-pointer px-4 py-2 flex items-center justify-between ${
                                      index === cityHighlightedIndex 
                                        ? 'bg-orange-100 text-orange-900' 
                                        : 'hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{city}</span>
                                    {formData.currentLocationDetails.city === city && (
                                      <Check className="h-4 w-4 text-orange-600" />
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-sm text-slate-500">
                                  {citySearch.trim() 
                                    ? "No matching cities found. You can enter the city manually." 
                                    : "No cities found. Try typing to search."}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  {showErrors && errors.city && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.city}
                    </p>
                  )}
                </div>
                {/* <div className="space-y-3">
                  <Label htmlFor="fullAddress" className="text-sm font-bold text-gray-700">Complete Address</Label>
                  <Textarea
                    id="fullAddress"
                    value={formData.currentLocationDetails.fullAddress}
                    onChange={(e) => handleInputChange("currentLocationDetails.fullAddress", e.target.value)}
                    placeholder="Enter complete address with landmarks"
                    rows={4}
                    className={getInputClassName("currentLocationDetails.fullAddress", "resize-none rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium")}
                  />
                  {showErrors && errors["currentLocationDetails.fullAddress"] && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="h-4 w-4" />
                      {errors["currentLocationDetails.fullAddress"]}
                    </p>
                  )}
                </div> */}
              </div>

              {/* Languages Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Spoken Languages</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Languages you can communicate in</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700">Select Languages <span className="text-red-500">*</span></Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative" style={{ zIndex: openLanguageDropdown ? 50 : 'auto' }}>
                      <Input
                        value={selectedLanguage}
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                          setOpenLanguageDropdown(true);
                        }}
                        onFocus={() => setOpenLanguageDropdown(true)}
                        onBlur={(e) => {
                          // Delay closing to allow click events on dropdown items
                          setTimeout(() => setOpenLanguageDropdown(false), 200);
                        }}
                        placeholder="Type or select a language (e.g., English, Hindi, Spanish)"
                        className={getInputClassName("spokenLanguages", "h-11 flex-1 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900 pr-10")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (selectedLanguage.trim() && !formData.spokenLanguages.includes(selectedLanguage.trim())) {
                              addToArray("spokenLanguages", selectedLanguage, setSelectedLanguage);
                              setOpenLanguageDropdown(false);
                              if (showErrors && errors.spokenLanguages) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors.spokenLanguages;
                                  return newErrors;
                                });
                              }
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 focus:outline-none z-10"
                        onClick={() => setOpenLanguageDropdown(!openLanguageDropdown)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {/* Languages Dropdown */}
                      {openLanguageDropdown && (
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {/* Show custom language option if typed value doesn't match any existing language */}
                          {selectedLanguage.trim() && 
                           !commonLanguages.some(lang => 
                             lang.toLowerCase() === selectedLanguage.trim().toLowerCase()
                           ) && 
                           !formData.spokenLanguages.some(lang => 
                             lang.toLowerCase() === selectedLanguage.trim().toLowerCase()
                           ) && (
                            <div
                              onClick={() => {
                                if (!formData.spokenLanguages.includes(selectedLanguage.trim())) {
                                  addToArray("spokenLanguages", selectedLanguage, setSelectedLanguage);
                                  setOpenLanguageDropdown(false);
                                  if (showErrors && errors.spokenLanguages) {
                                    setErrors((prev) => {
                                      const newErrors = { ...prev };
                                      delete newErrors.spokenLanguages;
                                      return newErrors;
                                    });
                                  }
                                }
                              }}
                              className="cursor-pointer bg-orange-50 hover:bg-orange-100 px-4 py-2 flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4 text-orange-600" />
                              <span className="font-medium">Add "{selectedLanguage.trim()}"</span>
                            </div>
                          )}
                          
                          {/* Show filtered languages from common list - limit to 50 for performance */}
                          {commonLanguages
                            .filter(lang => 
                              !formData.spokenLanguages.includes(lang) &&
                              (!selectedLanguage.trim() || 
                              lang.toLowerCase().includes(selectedLanguage.toLowerCase()))
                            )
                            .slice(0, 50)
                            .map((lang) => (
                              <div
                                key={lang}
                                onClick={() => {
                                  if (!formData.spokenLanguages.includes(lang)) {
                                    addToArray("spokenLanguages", lang, setSelectedLanguage);
                                    setOpenLanguageDropdown(false);
                                    if (showErrors && errors.spokenLanguages) {
                                      setErrors((prev) => {
                                        const newErrors = { ...prev };
                                        delete newErrors.spokenLanguages;
                                        return newErrors;
                                      });
                                    }
                                  }
                                }}
                                className="cursor-pointer px-4 py-2 hover:bg-slate-50 flex items-center justify-between"
                              >
                                <span>{lang}</span>
                                {formData.spokenLanguages.includes(lang) && (
                                  <Check className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    {selectedLanguage.trim() && !formData.spokenLanguages.includes(selectedLanguage.trim()) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addToArray("spokenLanguages", selectedLanguage, setSelectedLanguage);
                          setOpenLanguageDropdown(false);
                          if (showErrors && errors.spokenLanguages) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.spokenLanguages;
                              return newErrors;
                            });
                          }
                        }}
                        className="h-11 px-6 rounded-lg border-orange-300 text-orange-700 hover:bg-orange-50 font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    )}
                  </div>
                  {showErrors && errors.spokenLanguages && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.spokenLanguages}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.spokenLanguages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="gap-2 py-1.5 px-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-medium text-sm">
                        {language}
                        <X
                          className="h-3.5 w-3.5 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => removeFromArray("spokenLanguages", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardContent className="p-8 lg:p-10 space-y-10" style={{ overflow: 'visible' }}>
              {/* Professional Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Educational Background</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Your academic qualifications and experience</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="highestQualification" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate-500" />
                      Educational Qualification <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.highestQualification}
                      onValueChange={(value) => handleInputChange("highestQualification", value)}
                    >
                      <SelectTrigger className={getInputClassName("highestQualification", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}>
                        <SelectValue placeholder="Select your highest qualification" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg max-h-60">
                        {qualificationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.highestQualification && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.highestQualification}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        Work Experience (Years) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="experienceYears"
                        type="number"
                        min="0"
                        value={experienceYearsInput}
                        onChange={(e) => {
                          setExperienceYearsInput(e.target.value);
                        }}
                        onBlur={(e) => {
                          const v = e.target.value.trim();
                          if (v === "") {
                            setExperienceYearsInput("");
                            handleInputChange("totalExperienceYears", 0);
                          } else {
                            const parsed = Number.parseInt(v, 10);
                            if (!Number.isNaN(parsed) && parsed >= 0) {
                              handleInputChange("totalExperienceYears", parsed);
                              setExperienceYearsInput(String(parsed));
                            } else {
                              setExperienceYearsInput("");
                              handleInputChange("totalExperienceYears", 0);
                            }
                          }
                        }}
                        className={getInputClassName("totalExperienceYears", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                        required
                      />
                      {showErrors && errors.totalExperienceYears && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                          <X className="h-3 w-3" />
                          {errors.totalExperienceYears}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceMonths" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        Additional Months <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="experienceMonths"
                        type="number"
                        min="0"
                        max="11"
                        value={experienceMonthsInput}
                        onChange={(e) => {
                          setExperienceMonthsInput(e.target.value);
                        }}
                        onBlur={(e) => {
                          const v = e.target.value.trim();
                          if (v === "") {
                            setExperienceMonthsInput("");
                            handleInputChange("totalExperienceMonths", 0);
                          } else {
                            const parsed = Number.parseInt(v, 10);
                            if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 11) {
                              handleInputChange("totalExperienceMonths", parsed);
                              setExperienceMonthsInput(String(parsed));
                            } else {
                              setExperienceMonthsInput("")
                              handleInputChange("totalExperienceMonths", 0);
                            }
                          }
                        }}
                        className={getInputClassName("totalExperienceMonths", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                      />
                      {showErrors && errors.totalExperienceMonths && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                          <X className="h-3 w-3" />
                          {errors.totalExperienceMonths}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Skills & Expertise</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Your technical and professional capabilities</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700">Technical & Professional Skills</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative" style={{ zIndex: openSkillsDropdown ? 50 : 'auto' }}>
                      <Input
                        value={currentSkill}
                        onChange={(e) => {
                          setCurrentSkill(e.target.value);
                          setOpenSkillsDropdown(true);
                        }}
                        onFocus={() => setOpenSkillsDropdown(true)}
                        onBlur={(e) => {
                          // Delay closing to allow click events on dropdown items
                          setTimeout(() => setOpenSkillsDropdown(false), 200);
                        }}
                        placeholder="Type or select a skill (e.g., React, Python, Digital Marketing, Project Management)"
                        className={getInputClassName("skills", "h-11 flex-1 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900 pr-10")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
                              addToArray("skills", currentSkill, setCurrentSkill);
                              setOpenSkillsDropdown(false);
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 focus:outline-none z-10"
                        onClick={() => setOpenSkillsDropdown(!openSkillsDropdown)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {/* Skills Dropdown */}
                      {openSkillsDropdown && (
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {/* Show custom skill option if typed value doesn't match any existing skill */}
                          {currentSkill.trim() && 
                           !commonSkills.some(skill => 
                             skill.toLowerCase() === currentSkill.trim().toLowerCase()
                           ) && 
                           !formData.skills.some(skill => 
                             skill.toLowerCase() === currentSkill.trim().toLowerCase()
                           ) && (
                            <div
                              onClick={() => {
                                if (!formData.skills.includes(currentSkill.trim())) {
                                  addToArray("skills", currentSkill, setCurrentSkill);
                                  setOpenSkillsDropdown(false);
                                }
                              }}
                              className="cursor-pointer bg-orange-50 hover:bg-orange-100 px-4 py-2 flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4 text-orange-600" />
                              <span className="font-medium">Add "{currentSkill.trim()}"</span>
                            </div>
                          )}
                          
                          {/* Show filtered skills from common list */}
                          {commonSkills
                            .filter(skill => 
                              !currentSkill.trim() || 
                              skill.toLowerCase().includes(currentSkill.toLowerCase())
                            )
                            .map((skill) => (
                              <div
                                key={skill}
                                onClick={() => {
                                  if (!formData.skills.includes(skill)) {
                                    addToArray("skills", skill, setCurrentSkill);
                                    setOpenSkillsDropdown(false);
                                  }
                                }}
                                className="cursor-pointer px-4 py-2 hover:bg-slate-50 flex items-center justify-between"
                              >
                                <span>{skill}</span>
                                {formData.skills.includes(skill) && (
                                  <Check className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    {currentSkill.trim() && !formData.skills.includes(currentSkill.trim()) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addToArray("skills", currentSkill, setCurrentSkill);
                          setOpenSkillsDropdown(false);
                        }}
                        className="h-11 px-6 rounded-lg border-orange-300 text-orange-700 hover:bg-orange-50 font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="gap-2 py-1.5 px-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-medium text-sm">
                        {skill}
                        <X
                          className="h-3.5 w-3.5 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => removeFromArray("skills", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Employment Preferences Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Employment Preferences</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Your job preferences and requirements</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">Preferred Industries & Job Categories</Label>
                    <Popover open={openCategoryDropdown} onOpenChange={setOpenCategoryDropdown}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCategoryDropdown}
                          className="h-11 w-full justify-between rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal hover:bg-slate-50 text-slate-700"
                        >
                          <span className="text-slate-500">Select job categories...</span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search categories..." className="h-9" />
                          <CommandEmpty>No categories found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {categoryOptions.map((category) => (
                                <CommandItem
                                  key={category}
                                  value={category}
                                  onSelect={() => handleCategorySelect(category)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{category}</span>
                                    {formData.preferredJobCategories.includes(category) && (
                                      <Check className="h-4 w-4 text-orange-600" />
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.preferredJobCategories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="gap-2 py-1.5 px-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-medium text-sm">
                          {category}
                          <X
                            className="h-3.5 w-3.5 cursor-pointer hover:text-red-600 transition-colors"
                            onClick={() => removeFromArray("preferredJobCategories", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">Preferred Employment Types <span className="text-red-500">*</span></Label>
                    <Popover open={openEmploymentTypeDropdown} onOpenChange={setOpenEmploymentTypeDropdown}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openEmploymentTypeDropdown}
                          className="h-11 w-full justify-between rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal hover:bg-slate-50 text-slate-700"
                        >
                          <span className="text-slate-500">
                            {formData.preferredEmploymentTypes.length > 0
                              ? `${formData.preferredEmploymentTypes.length} employment type(s) selected`
                              : "Select employment types..."}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search employment types..." className="h-9" />
                          <CommandEmpty>No employment types found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {employmentTypeOptions.map((type) => (
                                <CommandItem
                                  key={type}
                                  value={type}
                                  onSelect={() => handleEmploymentTypeSelect(type)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{type}</span>
                                    {formData.preferredEmploymentTypes.includes(type) && (
                                      <Check className="h-4 w-4 text-orange-600" />
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.preferredEmploymentTypes.map((type, index) => (
                        <Badge key={index} variant="secondary" className="gap-2 py-1.5 px-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-medium text-sm">
                          {type}
                          <X
                            className="h-3.5 w-3.5 cursor-pointer hover:text-red-600 transition-colors"
                            onClick={() => removeFromArray("preferredEmploymentTypes", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                    {showErrors && errors.preferredEmploymentTypes && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.preferredEmploymentTypes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Preferred Work Types <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['remote', 'hybrid', 'on-site'] as const).map((type) => (
                      <div key={type} className="flex items-center space-x-3 p-3 border-2 border-slate-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 cursor-pointer">
                        <Checkbox
                          id={type}
                          checked={formData.preferredWorkTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData((prev) => ({
                                ...prev,
                                preferredWorkTypes: [...prev.preferredWorkTypes, type],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                preferredWorkTypes: prev.preferredWorkTypes.filter((t) => t !== type),
                              }));
                            }
                            if (checked && showErrors && errors.preferredWorkTypes) {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.preferredWorkTypes;
                                return newErrors;
                              });
                            }
                          }}
                          className="w-5 h-5 rounded border border-slate-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600 flex-shrink-0"
                          style={{ minHeight: '20px', minWidth: '20px' }}
                        />
                        <Label htmlFor={type} className="text-sm font-medium cursor-pointer capitalize flex-1 text-slate-700">
                          {type.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {showErrors && errors.preferredWorkTypes && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.preferredWorkTypes}
                    </p>
                  )}
                </div>

                {/* Additional Preferences Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-slate-500" />
                      How Soon Are You Ready to Start? <span className="text-slate-400 text-xs">(Optional)</span>
                    </Label>
                    <Select
                      value={formData.howSoonReady || ""}
                      onValueChange={(value) => handleInputChange("howSoonReady", value)}
                    >
                      <SelectTrigger className={getInputClassName("howSoonReady", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        {howSoonReadyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {showErrors && errors.howSoonReady && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.howSoonReady}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      Expected Salary (₹/month) <span className="text-slate-400 text-xs">(Optional)</span>
                    </Label>
                    <Input
                      id="expectedSalary"
                      type="number"
                      min="0"
                      value={formData.expectedSalary || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          handleInputChange("expectedSalary", undefined);
                        } else {
                          const parsed = Number.parseInt(value, 10);
                          if (!Number.isNaN(parsed) && parsed >= 0) {
                            handleInputChange("expectedSalary", parsed);
                          }
                        }
                      }}
                      placeholder="Enter expected salary (e.g., 50000)"
                      className={getInputClassName("expectedSalary", "h-11 rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900")}
                    />
                    {showErrors && errors.expectedSalary && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.expectedSalary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Job Locations Section */}
                <div className="space-y-2 pt-4">
                  <Label className="text-sm font-semibold text-slate-700">Select Preferred Job Locations <span className="text-slate-400 text-xs">(Optional)</span></Label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative" style={{ zIndex: openJobLocationDropdown ? 50 : 'auto' }}>
                      <Input
                        value={currentJobLocation}
                        onChange={(e) => {
                          setCurrentJobLocation(e.target.value);
                          setOpenJobLocationDropdown(true);
                        }}
                        onFocus={() => setOpenJobLocationDropdown(true)}
                        onBlur={(e) => {
                          // Delay closing to allow click events on dropdown items
                          setTimeout(() => setOpenJobLocationDropdown(false), 200);
                        }}
                        placeholder="Type or select location (e.g., Bangalore, Mumbai, Remote)"
                        className={getInputClassName("preferredJobLocations", "h-11 w-full rounded-lg border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-white font-normal text-slate-900 pr-10")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (currentJobLocation.trim() && !formData.preferredJobLocations.includes(currentJobLocation.trim())) {
                              addToArray("preferredJobLocations", currentJobLocation, setCurrentJobLocation);
                              setOpenJobLocationDropdown(false);
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 focus:outline-none z-10"
                        onClick={() => setOpenJobLocationDropdown(!openJobLocationDropdown)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {/* Custom Dropdown */}
                      {openJobLocationDropdown && (
                        <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {/* Show custom location option if typed value doesn't match any existing location */}
                          {currentJobLocation.trim() && 
                           !commonJobLocations.some(loc => 
                             loc.toLowerCase() === currentJobLocation.trim().toLowerCase()
                           ) && 
                           !formData.preferredJobLocations.some(loc => 
                             loc.toLowerCase() === currentJobLocation.trim().toLowerCase()
                           ) && (
                            <div
                              onClick={() => {
                                if (!formData.preferredJobLocations.includes(currentJobLocation.trim())) {
                                  addToArray("preferredJobLocations", currentJobLocation, setCurrentJobLocation);
                                  setOpenJobLocationDropdown(false);
                                }
                              }}
                              className="cursor-pointer bg-orange-50 hover:bg-orange-100 px-4 py-2 flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4 text-orange-600" />
                              <span className="font-medium">Add "{currentJobLocation.trim()}"</span>
                            </div>
                          )}
                          
                          {/* Show filtered locations from common list */}
                          {commonJobLocations
                            .filter(loc => 
                              !currentJobLocation.trim() || 
                              loc.toLowerCase().includes(currentJobLocation.toLowerCase())
                            )
                            .map((location) => (
                              <div
                                key={location}
                                onClick={() => {
                                  handleJobLocationSelect(location);
                                  setCurrentJobLocation("");
                                  setOpenJobLocationDropdown(false);
                                }}
                                className="cursor-pointer px-4 py-2 hover:bg-slate-50 flex items-center justify-between"
                              >
                                <span>{location}</span>
                                {formData.preferredJobLocations.includes(location) && (
                                  <Check className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            ))}
                          
                          {/* Show empty state if no matches */}
                          {currentJobLocation.trim() && 
                           commonJobLocations.filter(loc => 
                             loc.toLowerCase().includes(currentJobLocation.toLowerCase())
                           ).length === 0 &&
                           commonJobLocations.some(loc => 
                             loc.toLowerCase() === currentJobLocation.trim().toLowerCase()
                           ) && (
                            <div className="px-4 py-2 text-sm text-slate-500">
                              No matching locations. Use the 'Add' button or press Enter to add this location.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {currentJobLocation.trim() && !formData.preferredJobLocations.includes(currentJobLocation.trim()) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addToArray("preferredJobLocations", currentJobLocation, setCurrentJobLocation);
                          setOpenJobLocationDropdown(false);
                        }}
                        className="h-11 px-6 rounded-lg border-orange-300 text-orange-700 hover:bg-orange-50 font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.preferredJobLocations.map((location, index) => (
                      <Badge key={index} variant="secondary" className="gap-2 py-1.5 px-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-medium text-sm">
                        {location}
                        <X
                          className="h-3.5 w-3.5 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => removeFromArray("preferredJobLocations", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  {showErrors && errors.preferredJobLocations && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.preferredJobLocations}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-12 pt-8 border-t-2 border-slate-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 px-8 py-6 h-auto rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
              {showSuccessPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  style={{margin: '0'}}
                  onClick={() => setShowSuccessPopup(false)}
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center border border-slate-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Profile Created Successfully!</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{successMessage}</p>
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowSuccessPopup(false);
                          setSuccessMessage(null);
                          // Reset form
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            fatherName: "",
                            dateOfBirth: "",
                            gender: "Male",
                            aadharNumber: "",
                            highestQualification: "",
                            currentLocationDetails: {
                              street: "",
                              area: "",
                              city: "",
                              pincode: "",
                              fullAddress: "",
                            },
                            spokenLanguages: [],
                            totalExperienceYears: 0,
                            totalExperienceMonths: 0,
                            skills: [],
                            preferredJobCategories: [],
                            preferredEmploymentTypes: [],
                            preferredWorkTypes: [],
                            howSoonReady: "",
                            preferredJobLocations: [],
                            expectedSalary: undefined,
                          });
                          setCurrentJobLocation("");
                          setExperienceYearsInput("");
                          setExperienceMonthsInput("");
                          setSelectedCountry("India");
                          setCitySearch("");
                          setCities([]);
                          clearResume();
                        }}
                        className="rounded-lg border-orange-300 text-orange-700 hover:bg-orange-50 font-medium px-6"
                      >
                        Add Another Candidate
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>


              {/*error popup */}
            <AnimatePresence>
              {showErrorPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  style={{margin: '0'}}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowErrorPopup(false);
                    setIsSubmitting(false);
                  }}
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center border border-slate-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <XCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Error</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{errorMessage}</p>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowErrorPopup(false);
                          setIsSubmitting(false);
                        }}
                        className="rounded-lg border-orange-300 text-orange-700 hover:bg-orange-50 font-medium px-6"
                      >
                        close
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center border border-slate-200">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Loader2 className="h-10 w-10 text-white animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Creating Profile...</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We're processing your information and setting up your profile.
                  </p>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full animate-pulse transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">
                    Please wait while we save your information...
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
        {showFooter && <FooterComponent />}
      </div>
  );
}
