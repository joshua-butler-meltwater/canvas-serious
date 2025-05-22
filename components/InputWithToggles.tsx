import { useState, ChangeEvent, useEffect, useRef } from "react";
import svgPaths from "../imports/svg-rznp95eofg"; // Using existing SVG paths file

// Types for our component props and states
type ToggleButtonState = "default" | "hover" | "active";
type ToggleButtonType = "canvas" | "deepResearch";

interface ToggleButtonProps {
  label: string;
  state: ToggleButtonState;
  type: ToggleButtonType;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface InputWithTogglesProps {
  showCoreBanner?: boolean;
  onToggleBanner?: () => void;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  activePrompt?: {
    label: string;
    icon: string;
  } | null;
}

// SVG Icon components
const Icons = () => (
  <div className="relative shrink-0 size-4" data-name="Icons">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 16 16"
    >
      <g id="Icons">
        <path
          d="M8 1.33333C11.6667 1.33333 14.6667 4.33333 14.6667 8C14.6667 11.6667 11.6667 14.6667 8 14.6667C4.33333 14.6667 1.33333 11.6667 1.33333 8C1.33333 4.33333 4.33333 1.33333 8 1.33333ZM8 7.33333H5.33333V8.66667H8V11.3333L10.6667 8.66667L8 6V7.33333Z"
          fill="url(#paint0_linear_2_4655)"
          id="Vector"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_2_4655"
          x1="1.33333"
          x2="14.6668"
          y1="13.9892"
          y2="13.9891"
        >
          <stop stopColor="#8B49A0" />
          <stop offset="1" stopColor="#497C9F" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <div 
    className="relative shrink-0 size-4 cursor-pointer" 
    data-name="close"
    onClick={onClick}
  >
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 16 16"
    >
      <g id="close">
        <path
          d="M12.6667 4.27333L11.7267 3.33333L8 7.05999L4.27333 3.33333L3.33333 4.27333L7.06 8L3.33333 11.7267L4.27333 12.6667L8 8.94L11.7267 12.6667L12.6667 11.7267L8.94 8L12.6667 4.27333Z"
          fill="url(#paint0_linear_2_4652)"
          id="Vector"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_2_4652"
          x1="4.24121"
          x2="11.7666"
          y1="12.5519"
          y2="12.5518"
        >
          <stop stopColor="#8B49A0" />
          <stop offset="1" stopColor="#497C9F" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ArrowUpwardIcon = ({ isActive }: { isActive: boolean }) => (
  <div className="relative shrink-0 size-5" data-name="arrow_upward">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 20 20"
    >
      <g id="arrow_upward">
        <path
          d={svgPaths.p334f57f0}
          fill={isActive ? "white" : "var(--fill-0, #212121)"}
          fillOpacity={isActive ? "1" : "0.38"}
          id="Vector"
        />
      </g>
    </svg>
  </div>
);

// Custom Icon for Core Banner
const CustomIcon = ({ iconPath }: { iconPath: string }) => (
  <div className="flex items-center justify-center relative size-4 min-w-[16px]" data-name="Icons">
    <svg
      className="block"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 36 36"
      width="16"
      height="16"
    >
      <g id="Icons">
        <path
          d={iconPath}
          fill="url(#paint0_linear_2_4655)"
          id="Vector"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_2_4655"
          x1="1.33333"
          x2="14.6668"
          y1="13.9892"
          y2="13.9891"
        >
          <stop stopColor="#8B49A0" />
          <stop offset="1" stopColor="#497C9F" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Core Banner component
const CorePromptBanner = ({ 
  onClose, 
  promptLabel = "PR Impact",
  promptIcon
}: { 
  onClose: () => void;
  promptLabel?: string;
  promptIcon?: string;
}) => (
  <div
    className="h-6 relative rounded shrink-0 w-full"
    data-name="Core Prompt Banner"
    style={{
      backgroundImage:
        "linear-gradient(9.51794deg, rgb(250, 247, 252) 0%, rgb(246, 250, 250) 100%)",
    }}
  >
    <div className="flex flex-row items-center relative size-full">
      <div className="box-border content-stretch flex flex-row h-6 items-center justify-start pl-4 pr-1 py-0 relative w-full">
        <div
          className="basis-0 grow h-6 min-h-px min-w-px relative shrink-0"
          data-name="Toggle"
        >
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row h-6 items-center justify-start px-1 py-0 relative w-full">
              {promptIcon ? <CustomIcon iconPath={promptIcon} /> : <Icons />}
              <div className="relative shrink-0" data-name="Text + Padding">
                <div className="flex flex-row items-center justify-center relative size-full">
                  <div className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative">
                    <div className="css-yy66up flex flex-col font-['Helvetica_Neue:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#212121] text-[12px] text-center text-nowrap">
                      <p className="block leading-[16px] whitespace-pre">{promptLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CloseIcon onClick={onClose} />      
      </div>
    </div>
  </div>
);

// Toggle Button component
const ToggleButton = ({ 
  label, 
  state, 
  type, 
  isActive, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}: ToggleButtonProps) => {
  // Determine button styling based on state and isActive
  let buttonStyles = "min-w-6 relative rounded shrink-0 cursor-pointer";
  let borderStyles = "absolute border border-solid inset-0 pointer-events-none rounded";

  if (isActive) {
    buttonStyles += " bg-[rgba(29,159,159,0.12)]";
    borderStyles += " border-[#1d9f9f]";
  } else {
    borderStyles += " border-[#9e9e9e]";
  }

  // Apply hover styles
  if (state === "hover") {
    if (!isActive) {
      buttonStyles += " bg-[rgba(0,0,0,0.04)]";
    }
  }
  
  return (
    <div
      className={buttonStyles}
      data-name="Toggle Button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={borderStyles} />
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <div className="h-6 relative shrink-0" data-name="Toggle">
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row h-6 items-center justify-start px-1 py-0 relative">
              <div className="relative shrink-0" data-name="Text + Padding">
                <div className="flex flex-row items-center justify-center relative size-full">
                  <div className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative">
                    <div className="css-yy66up flex flex-col font-['Helvetica_Neue:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#212121] text-[12px] text-center text-nowrap">
                      <p className="block leading-[16px] whitespace-pre">{label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Submit Button component
const SubmitButton = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
  const [buttonState, setButtonState] = useState<ToggleButtonState>("default");
  
  let buttonStyles = "relative rounded-[36px] shrink-0 cursor-pointer";
  
  if (isActive) {
    buttonStyles += " bg-[#1d9f9f]";
  } else {
    buttonStyles += " bg-[rgba(33,33,33,0.12)]";
  }
  
  // Apply hover styles
  if (buttonState === "hover" && !isActive) {
    buttonStyles += " bg-[rgba(33,33,33,0.18)]";
  }
  
  return (
    <div
      className={buttonStyles}
      data-name="Button"
      onMouseEnter={() => setButtonState("hover")}
      onMouseLeave={() => setButtonState("default")}
      onClick={() => {
        setButtonState(prevState => prevState === "active" ? "default" : "active");
        onClick();
      }}
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div
          className="h-9 relative rounded-sm shrink-0"
          data-name="Contained Button"
        >
          <div className="flex flex-row items-center justify-center relative size-full">
            <div className="box-border content-stretch flex flex-row gap-1 h-9 items-center justify-center px-2 py-0 relative">
              <ArrowUpwardIcon isActive={isActive} />            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export function InputWithToggles({ 
  showCoreBanner = false, 
  onToggleBanner,
  defaultValue = "",
  onSubmit,
  activePrompt = null
}: InputWithTogglesProps) {
  // State for the component
  const [coreBannerVisible, setCoreBannerVisible] = useState(showCoreBanner);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [activeToggle, setActiveToggle] = useState<ToggleButtonType | null>(null);
  const [canvasButtonState, setCanvasButtonState] = useState<ToggleButtonState>("default");
  const [deepResearchButtonState, setDeepResearchButtonState] = useState<ToggleButtonState>("default");
  
  // Debug logs for banner visibility
  console.log('Initial coreBannerVisible:', coreBannerVisible);
  console.log('Initial showCoreBanner prop:', showCoreBanner);
  
  // Synchronize coreBannerVisible with showCoreBanner prop
  useEffect(() => {
    console.log(`showCoreBanner prop changed to: ${showCoreBanner}`);
    if (showCoreBanner !== coreBannerVisible) {
      console.log(`Updating coreBannerVisible from ${coreBannerVisible} to ${showCoreBanner}`);
      setCoreBannerVisible(showCoreBanner);
    }
  }, [showCoreBanner, coreBannerVisible]);
  
  // Reference to the textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Synchronize inputValue with defaultValue prop
  useEffect(() => {
    setInputValue(defaultValue);
    
    // Auto-resize the textarea when the default value changes
    if (textareaRef.current) {
      setTimeout(() => {
        textareaRef.current!.style.height = 'auto';
        textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`;
      }, 0);
    }
  }, [defaultValue]);
  
  // Container styles based on focus state
  let containerBorderStyles = "absolute border border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_22px_0px_rgba(0,0,0,0.06)]";
  
  if (inputFocused) {
    containerBorderStyles = "absolute border-2 border-[#b627a1] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_22px_0px_rgba(182,39,161,0.12)]";
  }
  
  // Toggle the core banner
  const handleToggleBanner = () => {
    setCoreBannerVisible(!coreBannerVisible);
    if (onToggleBanner) {
      onToggleBanner();
    }
  };
  
  // Toggle button click handlers
  const handleToggleClick = (type: ToggleButtonType) => {
    if (activeToggle === type) {
      setActiveToggle(null);
    } else {
      setActiveToggle(type);
    }
  };

  // Input change handler
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Submit handler
  const handleSubmit = () => {
    if (onSubmit && inputValue.trim()) {
      onSubmit(inputValue);
    }
  };
  
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-end overflow-clip p-0 relative w-full">
        <div
          className="bg-[#ffffff] relative rounded-[8px] shrink-0 w-full transition-all duration-200 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]"
          data-name="Container"
        >
          <div className={containerBorderStyles} />
          <div className="flex flex-col justify-end relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2 items-start justify-end p-[4px] relative w-full">
              {/* Core Prompt Banner - show when a core prompt is active */}
              {showCoreBanner && (
                <CorePromptBanner 
                  onClose={handleToggleBanner}
                  promptLabel={activePrompt?.label || "PR Impact"}
                  promptIcon={activePrompt?.icon}
                />
              )}
              <div className="relative shrink-0 w-full">
                <div className="relative size-full">
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pl-3 pr-1 py-2 relative w-full">
                    {/* Text Input */}
                    <div className="relative shrink-0 w-full" data-name="_Text Inputs">
                      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative w-full">
                        <textarea
                          ref={textareaRef}
                          value={inputValue}
                          onChange={handleInputChange}
                          onFocus={() => setInputFocused(true)}
                          onBlur={() => setInputFocused(false)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                          placeholder="Ask a question"
                          rows={1}
                          style={{ resize: 'none', overflow: 'hidden' }}
                          className={`basis-0 w-full bg-transparent border-none outline-none font-['Helvetica_Neue:Regular',_sans-serif] font-normal grow min-h-[22px] min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 ${inputFocused || inputValue ? 'text-[#212121]' : 'text-[#757575]'} text-[16px] text-left leading-[22px] py-0`}
                        />
                      </div>
                    </div>
                    
                    {/* Toggle Buttons and Submit */}
                    <div className="h-9 relative shrink-0 w-full" data-name="_Text Context Bar">
                      <div className="box-border content-stretch flex flex-row gap-2 h-9 items-end justify-start p-0 relative w-full">
                        <div
                          className="basis-0 grow min-h-px min-w-px relative rounded shrink-0"
                          data-name="AI Text Input actionbar"
                        >
                          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
                            {/* Left side toggle buttons */}
                            <div
                              className="basis-0 grow min-h-px min-w-px relative shrink-0"
                              data-name="Left"
                            >
                              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative w-full">
                                <ToggleButton 
                                  label="Canvas" 
                                  state={canvasButtonState}
                                  type="canvas"
                                  isActive={activeToggle === "canvas"}
                                  onClick={() => handleToggleClick("canvas")}
                                  onMouseEnter={() => setCanvasButtonState("hover")}
                                  onMouseLeave={() => setCanvasButtonState("default")}
                                />
                                <ToggleButton 
                                  label="Deep research" 
                                  state={deepResearchButtonState}
                                  type="deepResearch"
                                  isActive={activeToggle === "deepResearch"}
                                  onClick={() => handleToggleClick("deepResearch")}
                                  onMouseEnter={() => setDeepResearchButtonState("hover")}
                                  onMouseLeave={() => setDeepResearchButtonState("default")}
                                />
                              </div>
                            </div>
                            
                            {/* Right side submit button */}
                            <div className="relative shrink-0" data-name="Right">
                              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
                                <SubmitButton 
                                  isActive={!!activeToggle || inputFocused || !!inputValue} 
                                  onClick={handleSubmit}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputWithToggles;
