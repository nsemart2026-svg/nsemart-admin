"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function URLStructureCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">URL Structure</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure URL structure and redirects
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>URL Structure Type</Label>
            <Select>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select URL Pettern" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectItem value="option1">
                  Plain (domain.com/?p=123)
                </SelectItem>
                <SelectItem value="option2">
                  Numeric (domain.com/123/)
                </SelectItem>
                <SelectItem value="option3">
                  Category (domain.com/category/post-title/)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <Label>Remove WWW</Label>
              <p className="text-sm text-muted-foreground">
                Redirect www to non-www
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <Label>Force HTTPS</Label>
              <p className="text-sm text-muted-foreground">
                Redirect HTTP to HTTPS
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <Label>Trailing Slash</Label>
              <p className="text-sm text-muted-foreground">
                Add trailing slash to URLs
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
