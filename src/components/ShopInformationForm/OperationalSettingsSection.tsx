/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import timezones from 'timezones-list';
import currencies from 'world-currencies';
import { Settings } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function OperationalSettingsSection({
  formData,
  handleInputChange,
}: {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
            <Settings className="h-4 w-4 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Operational Settings
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Configure your shop&apos;s operational settings
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Currency */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Currency *
          </Label>
          <Select
            value={formData.currency}
            onValueChange={value => handleInputChange('currency', value)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencies).map(([code, { name }]) => (
                <SelectItem key={code} value={code}>
                  {code} - {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Timezone *
          </Label>
          <Select
            value={formData.timezone}
            onValueChange={value => handleInputChange('timezone', value)}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select Timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map(tz => (
                <SelectItem key={tz.tzCode} value={tz.tzCode}>
                  {tz.name}
                </SelectItem>
              ))}
              <SelectItem value="gmt">GMT - Greenwich Mean Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
