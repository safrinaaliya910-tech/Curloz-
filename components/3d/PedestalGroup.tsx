'use client';

interface PedestalProps {
  width: string | number;
  height: string | number;
  className?: string;
}

function CSSPedestal({ width, height, className = '' }: PedestalProps) {
  return (
    <div className={`relative flex flex-col ${className}`} style={{ width, height }}>
      {/* Top Face */}
      <div 
        className="absolute w-full h-[25%] top-0 left-0 rounded-[50%] bg-gradient-to-br from-white to-[#F0F0F0] border border-white/60 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.02)] z-10" 
      />
      
      {/* Body */}
      <div 
        className="absolute w-full h-[85%] bottom-[12.5%] left-0 bg-gradient-to-r from-[#E0E0E0] via-white to-[#D5D5D5] shadow-[inset_-15px_0_20px_rgba(0,0,0,0.05),_inset_10px_0_15px_rgba(255,255,255,0.8)] overflow-hidden" 
      >
        {/* Subtle procedural marble veining simulation (just some faint CSS borders/gradients) */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[radial-gradient(ellipse_at_20%_30%,_#A0A0A0_0%,_transparent_15%),_radial-gradient(ellipse_at_70%_60%,_#A0A0A0_0%,_transparent_20%)]" />
      </div>
      
      {/* Bottom Curve */}
      <div 
        className="absolute w-full h-[25%] bottom-0 left-0 rounded-[50%] bg-gradient-to-r from-[#C0C0C0] via-[#E8E8E8] to-[#B0B0B0] shadow-[0_15px_30px_rgba(0,0,0,0.15)] z-0" 
      />
      
      {/* Copper Base Trim */}
      <div 
        className="absolute w-[104%] h-[27%] bottom-[-1%] left-[-2%] rounded-[50%] bg-gradient-to-r from-[#B8722D] via-[#F9D4A6] to-[#8A4A11] -z-10 shadow-[0_5px_15px_rgba(184,114,45,0.4)]" 
      />
    </div>
  );
}

export default function PedestalGroup() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-[800px] h-full">
        
        {/* Back Left Pedestal (Shampoo) */}
        <CSSPedestal 
          width="25%" 
          height="140px" 
          className="absolute left-[15%] bottom-[25%]" 
        />
        
        {/* Center Pedestal (Conditioner) */}
        <CSSPedestal 
          width="32%" 
          height="80px" 
          className="absolute left-[38%] bottom-[18%] z-10" 
        />
        
        {/* Front Right Pedestal (Curl Cream) */}
        <CSSPedestal 
          width="28%" 
          height="50px" 
          className="absolute right-[12%] bottom-[12%] z-20" 
        />
        
        {/* Floor Reflections */}
        <div className="absolute bottom-0 left-[-20%] w-[140%] h-[25%] bg-gradient-to-t from-white via-white/80 to-transparent -z-20" />
      </div>
    </div>
  );
}
