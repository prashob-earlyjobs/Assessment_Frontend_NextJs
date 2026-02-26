
try {
    const navigation = require('next/navigation');
    console.log('Available exports in next/navigation:', Object.keys(navigation));
    if (navigation.useRouter) {
        console.log('useRouter is exported!');
    } else {
        console.log('useRouter is NOT exported!');
    }
} catch (e) {
    console.error('Error requiring next/navigation:', e.message);
}
