export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchCategories() {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function fetchFeaturedProducts() {
    const res = await fetch(`${API_URL}/products/featured`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch featured products');
    return res.json();
}

export async function fetchProducts(params = {}) {
    const url = new URL(`${API_URL}/products`);
    Object.keys(params).forEach(key => { if (params[key]) url.searchParams.append(key, params[key]) });

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function fetchProductBySlug(slug) {
    const res = await fetch(`${API_URL}/products/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export async function submitContact(data) {
    const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit contact');
    }
    return res.json();
}

export async function fetchTestimonials() {
    const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
}

export async function search(query) {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to search');
    return res.json();
}
