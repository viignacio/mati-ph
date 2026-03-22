import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: { current: string }
}

const TYPE_TO_PATH: Record<string, string[]> = {
  destination: ['/destinations'],
  activity: ['/activities'],
  festival: ['/'],
  foodSpot: ['/'],
  travelGuide: ['/travel-guide'],
  heroSlide: ['/'],
  siteSettings: ['/'],
  header: ['/'],
  footer: ['/'],
  page: ['/'],
}

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_WEBHOOK_SECRET,
    )

    if (isValidSignature === false) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    }

    // Revalidate the specific detail page if we have a slug
    if (body.slug?.current) {
      const slugPath = body._type === 'destination'
        ? `/destinations/${body.slug.current}`
        : body._type === 'activity'
          ? `/activities/${body.slug.current}`
          : body._type === 'travelGuide'
            ? `/travel-guide/${body.slug.current}`
            : `/${body.slug.current}`

      revalidatePath(slugPath)
    }

    // Revalidate list pages and homepage for this content type
    const paths = TYPE_TO_PATH[body._type] ?? ['/']
    for (const path of paths) {
      revalidatePath(path)
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type: body._type,
      slug: body.slug?.current,
      now: Date.now(),
    })
  } catch (err: unknown) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
