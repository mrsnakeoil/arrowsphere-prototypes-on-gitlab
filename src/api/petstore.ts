const BASE_URL = 'https://petstore.swagger.io/v2';

export interface Pet {
  id: number;
  name: string;
  category?: { id: number; name: string };
  photoUrls: string[];
  tags?: { id: number; name: string }[];
  status?: 'available' | 'pending' | 'sold';
}

export interface Order {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
}

export type PetStatus = 'available' | 'pending' | 'sold';

export async function findPetsByStatus(apiKey: string, status: PetStatus): Promise<Pet[]> {
  const res = await fetch(`${BASE_URL}/pet/findByStatus?status=${status}`, {
    headers: { 'api_key': apiKey },
  });
  if (!res.ok) throw new Error(`Failed to fetch pets: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPetById(apiKey: string, petId: number): Promise<Pet> {
  const res = await fetch(`${BASE_URL}/pet/${petId}`, {
    headers: { 'api_key': apiKey },
  });
  if (!res.ok) throw new Error(`Failed to fetch pet ${petId}: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getInventory(apiKey: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/store/inventory`, {
    headers: { 'api_key': apiKey },
  });
  if (!res.ok) throw new Error(`Failed to fetch inventory: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function placeOrder(apiKey: string, order: Order): Promise<Order> {
  const res = await fetch(`${BASE_URL}/store/order`, {
    method: 'POST',
    headers: {
      'api_key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error(`Failed to place order: ${res.status} ${res.statusText}`);
  return res.json();
}
