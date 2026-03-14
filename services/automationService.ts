export const saveDraft = async (formData: any) => {
    try {
        // Here we could implement saving draft to localStorage or specific supabase table
        console.log('[Automation] Draft auto-saved', formData.email || formData.whatsapp);
        localStorage.setItem('@ngritmo_draft', JSON.stringify(formData));
    } catch (e) {
        console.error('Failed to save draft:', e);
    }
};
