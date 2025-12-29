import { Link } from "wouter";
import logoImg from "figma:asset/c68abe051f9bb3901828d7472af82d8f5b8062f7.png";

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gray mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 pt-10 pb-16 px-8">
        <div className="flex flex-col gap-5 items-start">
          <Link href="/">
            <img src={logoImg} alt="DEW&ODE" className="h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity -ml-1" />
          </Link>
          
          <div className="flex flex-col gap-1 text-[10px] font-medium tracking-[0.15em] text-brand-light/60 uppercase">
            <a href="#" className="hover:text-brand-cyan transition-colors">TERMS OF USE</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">PRIVACY POLICY</a>
          </div>

          <div className="flex flex-col gap-1 text-brand-light/30 text-[9px] tracking-[0.15em] font-light uppercase">
            <span>COMPANY: DEW&ODE</span>
            <span>TEL: 010-0000-0000</span>
            <span>ADDRESS: SEOUL, KOREA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}