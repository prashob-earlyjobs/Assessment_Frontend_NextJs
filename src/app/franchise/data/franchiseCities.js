export const franchiseCities = {
    ghaziabad: {
        name: "Ghaziabad",
        state: "Uttar Pradesh",
        ncr: "NCR Hub",
        heroImage: "/images/ghaziabad.jpg",
        heroTitle: "Shaping Ghaziabad’s Next",
        heroSubtitle: "Where Your Career Journey Takes Off in Ghaziabad",
        heroDescription: "Connecting Ghaziabad's brightest talent with top employers across IT, Manufacturing, Retail & Education sectors. Build skills, find opportunities, and grow your career with EarlyJobs Ghaziabad.",
        placements: "2500+",
        partnerCompanies: "200+",
        localColleges: "200+",
        theme: {
            primary: "orange",
            gradient: "from-orange-600 to-red-600"
        }
    },
    lucknow: {
        name: "Lucknow",
        state: "Uttar Pradesh",
        ncr: "Nawabs City",
        heroImage: "/images/lucknow.jpg",
        heroTitle: "Shaping Lucknow’s Next",
        heroSubtitle: "Where Your Career Journey Takes Off in Lucknow",
        heroDescription: "Connecting Lucknow's brightest talent with top employers across IT, Manufacturing, Retail & Education sectors. Build skills, find opportunities, and grow your career with EarlyJobs Lucknow.",
        placements: "1500+",
        partnerCompanies: "100+",
        localColleges: "150+",
        theme: {
            primary: "orange",
            gradient: "from-orange-600 to-red-600"
        }
    }
    // Add more cities here
};

export const getDefaultCityData = (cityName) => ({
    name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    state: "India",
    ncr: "City Hub",
    heroImage: "/images/default-city.jpg",
    heroTitle: `Shaping ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}’s Next`,
    heroSubtitle: `Where Your Career Journey Takes Off in ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}`,
    heroDescription: `Connecting ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}'s brightest talent with top employers. Build skills, find opportunities, and grow your career with EarlyJobs.`,
    placements: "1000+",
    partnerCompanies: "50+",
    localColleges: "50+",
    theme: {
        primary: "orange",
        gradient: "from-orange-600 to-red-600"
    }
});
