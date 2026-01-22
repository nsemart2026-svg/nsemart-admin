import InputField from "@/components/shared/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const SocialMediaLinks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl font-semibold opacity-90">
          Social Media & Links
          <p className="opacity-60 text-sm lg:text-base">
            Company social media profiles and online presence
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField
          label="LinkedIn"
          placeholder="https://www.linkedin.com/company/example"
        />
        <InputField
          label="Twitter/X"
          placeholder="https://twitter.com/example"
        />
        <InputField
          label="Facebook"
          placeholder="https://www.facebook.com/example"
        />
        <InputField
          label="Instagram"
          placeholder="https://www.instagram.com/example"
        />
        <InputField
          label="YouTube"
          placeholder="https://www.youtube.com/c/example"
        />
        <InputField
          label="Blog/News"
          placeholder="https://www.example.com/blog"
        />
      </CardContent>
    </Card>
  );
};

export default SocialMediaLinks;
