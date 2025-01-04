import { getProduct } from '@/lib/services/products';

export async function GET(
  request: Request,
{ params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await getProduct(id);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
