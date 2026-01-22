import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OwnerCard({ title, name, since, avatarSrc, fallback, shops, sales }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{since}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Shops:</span>
            <span>{shops}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Sales:</span>
            <span>{sales}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
