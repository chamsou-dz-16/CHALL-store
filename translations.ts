
import { Language } from './types';

export const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.shop': { fr: 'Boutique', en: 'Shop', ar: 'المتجر' },
  'nav.admin': { fr: 'Administration', en: 'Admin', ar: 'الإدارة' },
  'nav.login': { fr: 'Connexion', en: 'Login', ar: 'دخول' },
  'nav.logout': { fr: 'Déconnexion', en: 'Logout', ar: 'خروج' },

  // Hero
  'hero.title_suffix': { fr: 'L\'élégance du style algérien', en: 'The elegance of Algerian style', ar: 'أناقة الأسلوب الجزائري' },
  'hero.subtitle': { 
    fr: 'Découvrez notre nouvelle collection de vêtements et cosmétiques. L\'alliance parfaite entre tradition et modernité pour Elle et Lui.', 
    en: 'Discover our new collection of clothing and cosmetics. The perfect blend of tradition and modernity for Him and Her.', 
    ar: 'اكتشفوا مجموعتنا الجديدة من الملابس ومستحضرات التجميل. المزيج المثالي بين التقاليد والحداثة له ولها.' 
  },
  'hero.cta': { fr: 'Découvrir la collection', en: 'Discover Collection', ar: 'اكتشف المجموعة' },

  // Shop
  'shop.collection': { fr: 'Collection', en: 'Collection', ar: 'المجموعة' },
  'shop.all': { fr: 'Tout voir', en: 'View All', ar: 'عرض الكل' },
  'shop.search_placeholder': { fr: 'Rechercher un produit...', en: 'Search for a product...', ar: 'البحث عن منتج...' },
  'shop.empty': { fr: 'Aucun produit disponible.', en: 'No products available.', ar: 'لا توجد منتجات متاحة.' },
  'shop.add_cart': { fr: 'Ajouter au panier', en: 'Add to Cart', ar: 'أضف إلى السلة' },
  'shop.out_stock': { fr: 'Rupture de stock', en: 'Out of Stock', ar: 'نفد المخزون' },
  'shop.size': { fr: 'Taille :', en: 'Size:', ar: 'المقاس :' },
  'shop.remaining': { fr: 'Plus que {qty} exemplaires !', en: 'Only {qty} left!', ar: 'بقي {qty} فقط!' },

  // Categories
  'cat.Homme': { fr: 'Homme', en: 'Men', ar: 'رجال' },
  'cat.Femme': { fr: 'Femme', en: 'Women', ar: 'نساء' },
  'cat.Cosmétique': { fr: 'Cosmétique', en: 'Cosmetics', ar: 'تجميل' },
  'cat.Accessoires': { fr: 'Accessoires', en: 'Accessories', ar: 'إكسسوارات' },
  'cat.Électronique': { fr: 'Électronique', en: 'Electronics', ar: 'إلكترونيات' },
  'cat.Maison': { fr: 'Maison', en: 'Home', ar: 'منزل' },

  // Cart
  'cart.title': { fr: 'Votre Panier', en: 'Your Cart', ar: 'سلة المشتريات' },
  'cart.empty': { fr: 'Votre panier est vide.', en: 'Your cart is empty.', ar: 'سلتك فارغة.' },
  'cart.continue': { fr: 'Continuer vos achats', en: 'Continue Shopping', ar: 'مواصلة التسوق' },
  'cart.remove': { fr: 'Supprimer', en: 'Remove', ar: 'حذف' },
  'cart.subtotal': { fr: 'Sous-total', en: 'Subtotal', ar: 'المجموع الفرعي' },
  'cart.taxes': { fr: 'Taxes et livraison calculés à la commande.', en: 'Taxes and shipping calculated at checkout.', ar: 'يتم حساب الضرائب والشحن عند الدفع.' },
  'cart.checkout': { fr: 'Commander', en: 'Checkout', ar: 'دفع' },

  // Checkout
  'checkout.title': { fr: 'Finaliser la commande', en: 'Checkout', ar: 'إتمام الطلب' },
  'checkout.back': { fr: 'Retour aux achats', en: 'Back to Shop', ar: 'العودة للمتجر' },
  'checkout.summary': { fr: 'Récapitulatif', en: 'Summary', ar: 'الملخص' },
  'checkout.shipping_info': { fr: 'Informations de livraison', en: 'Shipping Information', ar: 'معلومات التوصيل' },
  'checkout.firstname': { fr: 'Prénom', en: 'First Name', ar: 'الاسم الأول' },
  'checkout.lastname': { fr: 'Nom', en: 'Last Name', ar: 'اسم العائلة' },
  'checkout.address': { fr: 'Adresse', en: 'Address', ar: 'العنوان' },
  'checkout.city': { fr: 'Ville (Wilaya)', en: 'City', ar: 'المدينة' },
  'checkout.phone': { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' },
  'checkout.payment_method': { fr: 'Mode de paiement', en: 'Payment Method', ar: 'طريقة الدفع' },
  'checkout.payment_cod': { fr: 'Paiement à la livraison', en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
  'checkout.payment_beridimob': { fr: 'Beridimob / CCP', en: 'Beridimob / CCP', ar: 'بريدي موب / CCP' },
  'checkout.confirm': { fr: 'Confirmer la commande', en: 'Confirm Order', ar: 'تأكيد الطلب' },
  'checkout.success_title': { fr: 'Merci pour votre commande !', en: 'Thank you for your order!', ar: 'شكراً لطلبك!' },
  'checkout.success_msg': { fr: 'Votre commande a été reçue avec succès.', en: 'Your order has been received successfully.', ar: 'تم استلام طلبك بنجاح.' },
  'checkout.return_shop': { fr: 'Retour à la boutique', en: 'Return to Shop', ar: 'العودة للمتجر' },

  // Admin
  'admin.dashboard': { fr: 'Tableau de Bord', en: 'Dashboard', ar: 'لوحة التحكم' },
  'admin.stats': { fr: 'Statistiques', en: 'Statistics', ar: 'إحصائيات' },
  'admin.products': { fr: 'Produits', en: 'Products', ar: 'منتجات' },
  'admin.orders': { fr: 'Commandes', en: 'Orders', ar: 'طلبات' },
  'admin.settings': { fr: 'Paramètres', en: 'Settings', ar: 'إعدادات' },
  'admin.revenue': { fr: 'Chiffre d\'Affaires', en: 'Total Revenue', ar: 'إجمالي الإيرادات' },
  'admin.total_orders': { fr: 'Commandes Totales', en: 'Total Orders', ar: 'إجمالي الطلبات' },
  'admin.avg_cart': { fr: 'Panier Moyen', en: 'Avg Order Value', ar: 'متوسط الطلب' },
  'admin.confirm_save': { fr: 'Voulez-vous vraiment sauvegarder ce produit ?', en: 'Are you sure you want to save this product?', ar: 'هل أنت متأكد أنك تريد حفظ هذا المنتج؟' },
  'admin.confirm_delete': { fr: 'Voulez-vous vraiment supprimer ce produit ?', en: 'Are you sure you want to delete this product?', ar: 'هل أنت متأكد أنك تريد حذف هذا المنتج؟' },
  
  // Login
  'login.remember': { fr: 'Se souvenir de moi', en: 'Remember me', ar: 'تذكرني' },

  // Chatbot
  'chat.title': { fr: 'Support Client Chall', en: 'Chall Support', ar: 'خدمة عملاء Chall' },
  'chat.welcome': { fr: 'Bonjour ! Je suis l\'assistant virtuel de Chall. Comment puis-je vous aider avec vos commandes ou produits ?', en: 'Hello! I am Chall\'s virtual assistant. How can I help you with your orders or products?', ar: 'مرحباً! أنا المساعد الافتراضي لـ Chall. كيف يمكنني مساعدتك بخصوص طلباتك أو المنتجات؟' },
  'chat.placeholder': { fr: 'Écrivez votre message...', en: 'Type your message...', ar: 'اكتب رسالتك...' },

  // Footer
  'footer.about': { 
    fr: 'Votre destination privilégiée pour découvrir et acheter l\'excellence des produits algériens.', 
    en: 'Your premier destination to discover and buy the excellence of Algerian products.', 
    ar: 'وجهتكم الأولى لاكتشاف وشراء أجود المنتجات الجزائرية.' 
  },
  'footer.contact': { fr: 'Contactez-nous', en: 'Contact Us', ar: 'اتصل بنا' },
  'footer.follow': { fr: 'Suivez-nous', en: 'Follow Us', ar: 'تابعونا' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
};