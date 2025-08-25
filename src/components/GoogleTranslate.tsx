import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Declare global google translate functions
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
];

export const GoogleTranslate = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load Google Translate script
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load Google Translate script");
        toast({
          title: "Translation Error",
          description:
            "Failed to load translation service. Please check your internet connection.",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: languages.map((lang) => lang.code).join(","),
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true,
            },
            "google_translate_element"
          );
          setIsLoaded(true);
          console.log("Google Translate initialized successfully");
        } catch (error) {
          console.error("Google Translate initialization failed:", error);
          toast({
            title: "Translation Error",
            description: "Failed to initialize translation service.",
            variant: "destructive",
          });
        }
      }
    };

    // Check if script is already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup function - don't remove script to avoid re-initialization issues
      // const script = document.querySelector('script[src*="translate.google.com"]');
      // if (script) {
      //   script.remove();
      // }
    };
  }, [toast]);

  const translateTo = (languageCode: string) => {
    const language = languages.find((lang) => lang.code === languageCode);
    if (!language) {
      console.error("Language not found:", languageCode);
      return;
    }

    if (!isLoaded) {
      toast({
        title: "Translation Not Ready",
        description: "Please wait for the translation service to load.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentLanguage(language);

    // Wait for Google Translate to be ready
    const checkAndTranslate = (attempts = 0) => {
      const maxAttempts = 50; // 5 seconds max wait
      const selectElement = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;

      if (selectElement) {
        try {
          selectElement.value = languageCode;
          selectElement.dispatchEvent(new Event("change"));
          setIsLoading(false);

          toast({
            title: "Language Changed",
            description: `Website translated to ${language.name}`,
          });
        } catch (error) {
          console.error("Translation error:", error);
          setIsLoading(false);
          toast({
            title: "Translation Error",
            description: "Failed to change language. Please try again.",
            variant: "destructive",
          });
        }
      } else if (attempts < maxAttempts) {
        // If not ready, try again after a short delay
        setTimeout(() => checkAndTranslate(attempts + 1), 100);
      } else {
        setIsLoading(false);
        toast({
          title: "Translation Error",
          description:
            "Translation service is not responding. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    if (window.google && window.google.translate && isLoaded) {
      checkAndTranslate();
    } else {
      setIsLoading(false);
      toast({
        title: "Translation Error",
        description: "Translation service is not available.",
        variant: "destructive",
      });
    }
  };

  const resetToOriginal = () => {
    setIsLoading(true);
    setCurrentLanguage(languages[0]);

    if (window.google && window.google.translate && isLoaded) {
      const selectElement = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (selectElement) {
        try {
          selectElement.value = "";
          selectElement.dispatchEvent(new Event("change"));
          setIsLoading(false);

          toast({
            title: "Language Reset",
            description: "Website restored to original English",
          });
        } catch (error) {
          console.error("Reset error:", error);
          setIsLoading(false);
          toast({
            title: "Reset Error",
            description: "Failed to reset language. Please refresh the page.",
            variant: "destructive",
          });
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Custom Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            disabled={isLoading}
          >
            <Globe className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{currentLanguage.flag}</span>
            <span className="hidden md:inline">
              {isLoading ? "Loading..." : currentLanguage.name}
            </span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover border-border max-h-60 overflow-y-auto">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => {
                if (language.code === "en") {
                  resetToOriginal();
                } else {
                  translateTo(language.code);
                }
              }}
              className={`cursor-pointer hover:bg-accent ${
                currentLanguage.code === language.code ? "bg-accent" : ""
              }`}
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Custom CSS to hide Google Translate branding */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .goog-te-balloon-frame {
          display: none !important;
        }

        .goog-te-combo {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        .skiptranslate {
          display: none !important;
        }

        /* Hide Google Translate toolbar */
        .goog-te-ftab {
          display: none !important;
        }

        /* Prevent layout shift */
        #google_translate_element .goog-te-gadget {
          display: none !important;
        }

        /* Style translated text to maintain theme */
        .translated-ltr {
          direction: ltr !important;
        }

        .translated-rtl {
          direction: rtl !important;
        }
      `}</style>
    </>
  );
};
