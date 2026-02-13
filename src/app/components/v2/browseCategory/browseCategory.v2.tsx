"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHT } from "../../../../constants/theme";
import {
  FiGrid,
  FiHeart,
  FiPhone,
  FiActivity,
  FiShield,
  FiDroplet,
  FiMonitor,
  FiFileText,
  FiCoffee,
  FiAward,
  FiShoppingCart,
  FiAirplay,
  FiPackage,
  FiHeadphones,
  FiFilm,
  FiLayers,
  FiBell,
  FiZap,
  FiCpu,
  FiTrendingUp,
  FiShoppingBag,
  FiBook,
  FiDollarSign,
  FiHome,
  FiTool,
  FiNavigation,
  FiRadio,
  FiHelpCircle,
  FiBriefcase,
} from "react-icons/fi";

interface CategoryData {
  _id: { $oid: string };
  label: string;
  value: string;
}

interface Category {
  id: string;
  name: string;
  jobCount?: number;
  icon: IconType;
}

// Icon mapping function - All icons from Feather (fi) for uniformity - simple outline icons
const getCategoryIcon = (categoryName: string): IconType => {
  const iconMap: { [key: string]: IconType } = {
    Manufacturing: FiGrid,
    "Health Care": FiHeart,
    BPO: FiPhone,
    Biotech: FiActivity,
    Insurance: FiShield,
    "Oil And Gas": FiDroplet,
    "Information Technology": FiMonitor,
    "Media and news": FiFileText,
    "Food processing": FiCoffee,
    Law: FiAward,
    "E-commerce": FiShoppingCart,
    Aviation: FiAirplay,
    "Consumer Goods": FiPackage,
    ITES: FiHeadphones,
    Entertainment: FiFilm,
    Textile: FiLayers,
    Advertising: FiBell,
    "Electrical and Electronics": FiZap,
    "AI / ML": FiCpu,
    Banking: FiTrendingUp,
    Retail: FiShoppingBag,
    Education: FiBook,
    Finance: FiDollarSign,
    Hospitality: FiHome,
    Construction: FiTool,
    Aeronautical: FiNavigation,
    "Electronics and Communication": FiRadio,
    Other: FiHelpCircle,
  };

  return iconMap[categoryName] || FiBriefcase;
};

const BrowseCategoryV2 = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  // Real categories from the database
  const categoryData: CategoryData[] = [
    { _id: { $oid: "69313b73d025037d5ab9cfd4" }, label: "Manufacturing", value: "Manufacturing" },
    { _id: { $oid: "69313b73d025037d5ab9cfd6" }, label: "Health Care", value: "Health Care" },
    { _id: { $oid: "69313b73d025037d5ab9cfd7" }, label: "BPO", value: "BPO" },
    { _id: { $oid: "69313b73d025037d5ab9cfe4" }, label: "Biotech", value: "Biotech" },
    { _id: { $oid: "69313b73d025037d5ab9cfcf" }, label: "Insurance", value: "Insurance" },
    { _id: { $oid: "69313b73d025037d5ab9cfd0" }, label: "Oil And Gas", value: "Oil And Gas" },
    { _id: { $oid: "69313b73d025037d5ab9cfd5" }, label: "Information Technology", value: "Information Technology" },
    { _id: { $oid: "69313b73d025037d5ab9cfdc" }, label: "Media and news", value: "Media and news" },
    { _id: { $oid: "69313b73d025037d5ab9cfdd" }, label: "Food processing", value: "Food processing" },
    { _id: { $oid: "69313b73d025037d5ab9cfe0" }, label: "Law", value: "Law" },
    { _id: { $oid: "69313b73d025037d5ab9cfe2" }, label: "E-commerce", value: "E-commerce" },
    { _id: { $oid: "69313b73d025037d5ab9cfcd" }, label: "Aviation", value: "Aviation" },
    { _id: { $oid: "69313b73d025037d5ab9cfd3" }, label: "Consumer Goods", value: "Consumer Goods" },
    { _id: { $oid: "69313b73d025037d5ab9cfd8" }, label: "ITES", value: "ITES" },
    { _id: { $oid: "69313b73d025037d5ab9cfd9" }, label: "Entertainment", value: "Entertainment" },
    { _id: { $oid: "69313b73d025037d5ab9cfdb" }, label: "Textile", value: "Textile" },
    { _id: { $oid: "69313b73d025037d5ab9cfe1" }, label: "Advertising", value: "Advertising" },
    { _id: { $oid: "69313b73d025037d5ab9cfe3" }, label: "Electrical and Electronics", value: "Electrical and Electronics" },
    { _id: { $oid: "69313b73d025037d5ab9cfe6" }, label: "AI / ML", value: "AI / ML" },
    { _id: { $oid: "69313b73d025037d5ab9cfce" }, label: "Banking", value: "Banking" },
    { _id: { $oid: "69313b73d025037d5ab9cfd1" }, label: "Retail", value: "Retail" },
    { _id: { $oid: "69313b73d025037d5ab9cfd2" }, label: "Education", value: "Education" },
    { _id: { $oid: "69313b73d025037d5ab9cfda" }, label: "Finance", value: "Finance" },
    { _id: { $oid: "69313b73d025037d5ab9cfde" }, label: "Hospitality", value: "Hospitality" },
    { _id: { $oid: "69313b73d025037d5ab9cfdf" }, label: "Construction", value: "Construction" },
    { _id: { $oid: "69313b73d025037d5ab9cfe5" }, label: "Aeronautical", value: "Aeronautical" },
    { _id: { $oid: "69313b73d025037d5ab9cfe7" }, label: "Electronics and Communication", value: "Electronics and Communication" },
    { _id: { $oid: "69313b73d025037d5ab9cfe8" }, label: "Other", value: "Other" },
  ];

  // Helper function to generate sample job counts (replace with API data later)
  const getJobCount = (categoryName: string): number => {
    const jobCountMap: { [key: string]: number } = {
      Manufacturing: 1254,
      "Health Care": 1836,
      BPO: 924,
      Biotech: 612,
      Insurance: 748,
      "Oil And Gas": 856,
      "Information Technology": 2847,
      "Media and news": 1034,
      "Food processing": 1245,
      Law: 534,
      "E-commerce": 1923,
      Aviation: 678,
      "Consumer Goods": 1456,
      ITES: 1123,
      Entertainment: 892,
      Textile: 756,
      Advertising: 1045,
      "Electrical and Electronics": 1567,
      "AI / ML": 1234,
      Banking: 1789,
      Retail: 2134,
      Education: 1654,
      Finance: 1345,
      Hospitality: 1243,
      Construction: 1876,
      Aeronautical: 567,
      "Electronics and Communication": 1345,
      Other: 456,
    };
    return jobCountMap[categoryName] || 0;
  };

  // Transform category data with icons and job counts
  const categories: Category[] = categoryData.map((cat) => ({
    id: cat._id.$oid,
    name: cat.label,
    icon: getCategoryIcon(cat.label),
    jobCount: getJobCount(cat.label),
  }));

  // Show first 8 categories initially, all when showAll is true
  const displayedCategories = showAll ? categories : categories.slice(0, 10);

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    router.push(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div 
      className="w-full py-12" 
      style={{ 
        backgroundColor: `rgba(240, 133, 4, 0.05)` // PRIMARY_COLOR with 5% opacity
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Browse by Category
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-3xl">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum id scel...
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-4 text-center aspect-square"
              >
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <IconComponent className="text-3xl text-orange-500 stroke-[1.7]" />
                </div>

                {/* Category Name */}
                <div>
                  <h3 className="text-sm font-medium text-black">
                    {category.name}
                  </h3>
                </div>

                {/* Job Count Badge */}
                <div>
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {category.jobCount} jobs
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show All / Show Less Button */}
        {categories.length > 10 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleToggleShowAll}
              className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
            >
              {showAll ? "Show Less" : `Show All (${categories.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCategoryV2;
