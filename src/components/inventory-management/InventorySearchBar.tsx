import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download } from "lucide-react"

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const InventorySearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  )
}

export default InventorySearchBar
