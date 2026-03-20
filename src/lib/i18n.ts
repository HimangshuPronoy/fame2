// Internationalization utilities
export type Language = 'en' | 'mn';

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.listings': 'Browse',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    
    // Homepage
    'home.hero.title': 'Discover Mongolia\'s Best',
    'home.hero.subtitle': 'Find top-rated gyms, restaurants, spas, and more',
    'home.hero.aiPowered': 'AI-POWERED DISCOVERY',
    'home.hero.findBest': 'Find the Best',
    'home.hero.businesses': 'Businesses.',
    'home.hero.description': 'Discover Mongolia\'s top-rated restaurants, gyms, spas, and nightlife. Curated recommendations powered by AI, trusted by locals.',
    'home.search.placeholder': 'Search for businesses...',
    'home.search.exploreNow': 'EXPLORE NOW',
    'home.featured': 'Featured Listings',
    'home.categories': 'Browse by Category',
    'home.categories.discover': 'DISCOVER CATEGORIES',
    'home.categories.title': 'Searching is more easy by category',
    'home.categories.description': 'Explore our meticulously curated categories to find exactly what you\'re looking for. From world-class dining to elite fitness centers, discover the best your city has to offer.',
    'home.categories.places': 'Places',
    
    // Listings
    'listings.title': 'All Listings',
    'listings.filter': 'Filter',
    'listings.sort': 'Sort by',
    'listings.category': 'Category',
    'listings.location': 'Location',
    'listings.price': 'Price',
    'listings.rating': 'Rating',
    'listings.noResults': 'No listings found',
    
    // Listing Detail
    'listing.about': 'About',
    'listing.hours': 'Business Hours',
    'listing.amenities': 'Amenities',
    'listing.contact': 'Contact',
    'listing.phone': 'Phone',
    'listing.email': 'Email',
    'listing.website': 'Website',
    'listing.address': 'Address',
    'listing.bookNow': 'Book Now',
    'listing.viewMenu': 'View Menu',
    'listing.getDirections': 'Get Directions',
    'listing.reviews': 'Reviews',
    'listing.writeReview': 'Write a Review',
    'listing.gallery': 'Gallery',
    
    // Days
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',
    'day.closed': 'Closed',
    
    // Categories
    'category.fitness': 'Fitness',
    'category.gym': 'Gym',
    'category.restaurants': 'Restaurants',
    'category.restaurant': 'Restaurant',
    'category.nightlife': 'Nightlife',
    'category.spa': 'Spa',
    'category.beauty': 'Beauty',
    'category.wellness': 'Wellness',
    'category.hotels': 'Hotels',
    'category.shopping': 'Shopping',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.myListings': 'My Listings',
    'dashboard.saved': 'Saved',
    'dashboard.bookings': 'Bookings',
    'dashboard.profile': 'Profile',
    'dashboard.admin': 'Admin Panel',
    'dashboard.analytics': 'Analytics',
    
    // Admin Panel
    'admin.title': 'Manage Listings',
    'admin.subtitle': 'Add, edit, or remove listings from the platform',
    'admin.addListing': 'Add Listing',
    'admin.editListing': 'Edit Listing',
    'admin.deleteListing': 'Delete Listing',
    'admin.clearAll': 'Clear All',
    'admin.allListings': 'All Listings',
    'admin.active': 'Active',
    'admin.hidden': 'Hidden',
    'admin.featured': 'Featured',
    
    // Form Fields
    'form.title': 'Title',
    'form.subtitle': 'Subtitle',
    'form.description': 'Description',
    'form.bio': 'Bio / About',
    'form.category': 'Category',
    'form.location': 'Location',
    'form.address': 'Address',
    'form.city': 'City',
    'form.country': 'Country',
    'form.phone': 'Phone',
    'form.email': 'Email',
    'form.website': 'Website',
    'form.bookingUrl': 'Booking URL',
    'form.menuUrl': 'Menu URL',
    'form.videoUrl': 'Video URL',
    'form.price': 'Price',
    'form.coverImage': 'Cover Image',
    'form.gallery': 'Gallery Images',
    'form.amenities': 'Amenities',
    'form.tags': 'Tags',
    'form.hours': 'Business Hours',
    'form.socialMedia': 'Social Media',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.saving': 'Saving...',
    'form.saved': 'Saved successfully!',
    'form.required': 'Required',
    
    // Tabs
    'tab.basicInfo': 'Basic Info',
    'tab.details': 'Details',
    'tab.hours': 'Hours',
    'tab.media': 'Media',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
  mn: {
    // Navigation
    'nav.home': 'Нүүр',
    'nav.listings': 'Жагсаалт',
    'nav.dashboard': 'Хяналтын самбар',
    'nav.login': 'Нэвтрэх',
    'nav.logout': 'Гарах',
    'nav.profile': 'Профайл',
    
    // Homepage
    'home.hero.title': 'Монголын шилдгийг олоорой',
    'home.hero.subtitle': 'Шилдэг спорт зал, ресторан, спа болон бусад газруудыг олоорой',
    'home.hero.aiPowered': 'AI-ААР ХАНГАГДСАН ОЛДОЦ',
    'home.hero.findBest': 'Шилдгийг олоорой',
    'home.hero.businesses': 'Бизнесүүд.',
    'home.hero.description': 'Монголын шилдэг ресторан, спорт зал, спа болон шөнийн амьдралыг олоорой. AI-аар хангагдсан зөвлөмж, орон нутгийнхан итгэдэг.',
    'home.search.placeholder': 'Бизнес хайх...',
    'home.search.exploreNow': 'ОДОО СУДЛАХ',
    'home.featured': 'Онцлох жагсаалт',
    'home.categories': 'Ангиллаар үзэх',
    'home.categories.discover': 'АНГИЛЛУУДЫГ ОЛООРОЙ',
    'home.categories.title': 'Ангиллаар хайх нь илүү хялбар',
    'home.categories.description': 'Та хайж байгаа зүйлээ яг олохын тулд бидний нарийн ангилсан ангиллуудыг судлаарай. Дэлхийн түвшний хоолны газраас эхлээд элит фитнесс төвүүд хүртэл, хотынхоо шилдгийг олоорой.',
    'home.categories.places': 'Газар',
    
    // Listings
    'listings.title': 'Бүх жагсаалт',
    'listings.filter': 'Шүүлтүүр',
    'listings.sort': 'Эрэмбэлэх',
    'listings.category': 'Ангилал',
    'listings.location': 'Байршил',
    'listings.price': 'Үнэ',
    'listings.rating': 'Үнэлгээ',
    'listings.noResults': 'Жагсаалт олдсонгүй',
    
    // Listing Detail
    'listing.about': 'Тухай',
    'listing.hours': 'Ажлын цаг',
    'listing.amenities': 'Тав тухтай байдал',
    'listing.contact': 'Холбоо барих',
    'listing.phone': 'Утас',
    'listing.email': 'Имэйл',
    'listing.website': 'Вэбсайт',
    'listing.address': 'Хаяг',
    'listing.bookNow': 'Захиалах',
    'listing.viewMenu': 'Цэс үзэх',
    'listing.getDirections': 'Чиглэл авах',
    'listing.reviews': 'Сэтгэгдэл',
    'listing.writeReview': 'Сэтгэгдэл бичих',
    'listing.gallery': 'Зургийн цомог',
    
    // Days
    'day.monday': 'Даваа',
    'day.tuesday': 'Мягмар',
    'day.wednesday': 'Лхагва',
    'day.thursday': 'Пүрэв',
    'day.friday': 'Баасан',
    'day.saturday': 'Бямба',
    'day.sunday': 'Ням',
    'day.closed': 'Хаалттай',
    
    // Categories
    'category.fitness': 'Фитнесс',
    'category.gym': 'Спорт зал',
    'category.restaurants': 'Ресторан',
    'category.restaurant': 'Ресторан',
    'category.nightlife': 'Шөнийн амьдрал',
    'category.spa': 'Спа',
    'category.beauty': 'Гоо сайхан',
    'category.wellness': 'Эрүүл мэнд',
    'category.hotels': 'Зочид буудал',
    'category.shopping': 'Дэлгүүр',
    
    // Dashboard
    'dashboard.title': 'Хяналтын самбар',
    'dashboard.myListings': 'Миний жагсаалт',
    'dashboard.saved': 'Хадгалсан',
    'dashboard.bookings': 'Захиалга',
    'dashboard.profile': 'Профайл',
    'dashboard.admin': 'Админ самбар',
    'dashboard.analytics': 'Тайлан',
    
    // Admin Panel
    'admin.title': 'Жагсаалт удирдах',
    'admin.subtitle': 'Платформ дээр жагсаалт нэмэх, засах эсвэл устгах',
    'admin.addListing': 'Жагсаалт нэмэх',
    'admin.editListing': 'Жагсаалт засах',
    'admin.deleteListing': 'Жагсаалт устгах',
    'admin.clearAll': 'Бүгдийг арилгах',
    'admin.allListings': 'Бүх жагсаалт',
    'admin.active': 'Идэвхтэй',
    'admin.hidden': 'Нуугдсан',
    'admin.featured': 'Онцлох',
    
    // Form Fields
    'form.title': 'Гарчиг',
    'form.subtitle': 'Дэд гарчиг',
    'form.description': 'Тайлбар',
    'form.bio': 'Дэлгэрэнгүй мэдээлэл',
    'form.category': 'Ангилал',
    'form.location': 'Байршил',
    'form.address': 'Хаяг',
    'form.city': 'Хот',
    'form.country': 'Улс',
    'form.phone': 'Утас',
    'form.email': 'Имэйл',
    'form.website': 'Вэбсайт',
    'form.bookingUrl': 'Захиалгын холбоос',
    'form.menuUrl': 'Цэсний холбоос',
    'form.videoUrl': 'Видео холбоос',
    'form.price': 'Үнэ',
    'form.coverImage': 'Нүүр зураг',
    'form.gallery': 'Зургийн цомог',
    'form.amenities': 'Тав тухтай байдал',
    'form.tags': 'Шошго',
    'form.hours': 'Ажлын цаг',
    'form.socialMedia': 'Сошиал медиа',
    'form.save': 'Хадгалах',
    'form.cancel': 'Цуцлах',
    'form.saving': 'Хадгалж байна...',
    'form.saved': 'Амжилттай хадгалагдлаа!',
    'form.required': 'Заавал',
    
    // Tabs
    'tab.basicInfo': 'Үндсэн мэдээлэл',
    'tab.details': 'Дэлгэрэнгүй',
    'tab.hours': 'Цаг',
    'tab.media': 'Медиа',
    
    // Common
    'common.loading': 'Ачааллаж байна...',
    'common.error': 'Алдаа',
    'common.success': 'Амжилттай',
    'common.confirm': 'Баталгаажуулах',
    'common.delete': 'Устгах',
    'common.edit': 'Засах',
    'common.view': 'Үзэх',
    'common.search': 'Хайх',
    'common.filter': 'Шүүлтүүр',
    'common.clear': 'Арилгах',
    'common.apply': 'Хэрэглэх',
    'common.close': 'Хаах',
    'common.back': 'Буцах',
    'common.next': 'Дараах',
    'common.previous': 'Өмнөх',
  }
};

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // Check localStorage first
  const stored = localStorage.getItem('language');
  if (stored === 'en' || stored === 'mn') return stored;
  
  // Detect from browser/system
  const userLang = navigator.language.toLowerCase();
  
  // Check if Mongolian
  if (userLang.startsWith('mn')) return 'mn';
  
  // Try to detect location via timezone (rough approximation)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('Ulaanbaatar') || timezone.includes('Hovd') || timezone.includes('Choibalsan')) {
    return 'mn';
  }
  
  return 'en';
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

export function t(key: string, lang: Language): string {
  return translations[lang][key as keyof typeof translations['en']] || key;
}
