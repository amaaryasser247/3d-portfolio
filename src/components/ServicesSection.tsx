import { services } from '../data/portfolio';
import FadeIn from './FadeIn';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-0 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] text-[clamp(3rem,12vw,160px)]">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto mt-16 max-w-5xl sm:mt-20 md:mt-28">
        {services.map((service, index) => (
          <FadeIn
            key={service.index}
            delay={index * 0.1}
            y={20}
            className={index === 0 ? '' : 'border-t border-[rgba(12,12,12,0.15)]'}
          >
            <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-8 sm:py-10 md:py-12 lg:gap-14">
              <span className="w-full shrink-0 font-black leading-[0.9] text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] sm:w-[180px]">
                {service.index}
              </span>
              <div>
                <h3 className="font-medium uppercase leading-tight text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
