import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShopDescription() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Shop Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-relaxed text-gray-500">
        
        <p>
          Tech Gadgets Store is your one-stop destination for the latest and greatest in technology and electronics.
          We specialize in offering high-quality smartphones, laptops, smart home devices, audio equipment, and
          accessories at competitive prices.
        </p>

        <p>
          Founded in 2020, we`ve quickly grown to become one of the most trusted electronics retailers in the region.
          Our team of tech enthusiasts is dedicated to providing exceptional customer service and expert advice to
          help you find the perfect gadget for your needs.
        </p>

        <p>
          We pride ourselves on offering only genuine products with full warranties, fast shipping, and hassle-free
          returns. Whether you`re a tech novice or a seasoned professional, we`re here to help you navigate the
          ever-changing world of technology.
        </p>

      </CardContent>
    </Card>
  )
}
