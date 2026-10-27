export const realmsApi = {
  async getRealmById(id: string) {
    const res = await fetch(`/api/realms/${id}`);
    if (!res.ok) throw new Error("Failed to load realm");
    return res.json();
  },
};