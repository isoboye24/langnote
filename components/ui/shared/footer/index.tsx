import BottomFooter from './bottom-footer';
import logo from '@/public/images/logo.png';
import Image from 'next/image';
import SocialMedia from './social-media';
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Legal from './legal';
import QuickLinks from './quick-links';

const Footer = () => {
  const color = '#e78d00';
  return (
    <>
      <footer className="border-t footer-bg md:px-9 sm:px-4 pt-9 pb-1">
        <div className="grid gap-4 flex-rows-3 md:grid-cols-5 px-4 mb-6">
          <div className="text-gray-400  px-3 mb-5 sm:mb-0 md:col-span-2">
            <div className="flex justify-center items-center">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Logo"
                className="mb-8"
              />
            </div>
            <p className="px-2 lg:px-15 text-justify text-sm md:text-md lg:text-lg">
              LangNote is a platform for increasing your vocabulary learning at
              anywhere and anytime on different device platform by serving you
              with the opportunity to create your language books, groups and
              save your words or sentences.
            </p>
          </div>
          <div className=" hidden md:block">
            <Legal />
          </div>
          <div className=" hidden md:block">
            <div className="text-start">
              <QuickLinks />
            </div>
          </div>
          <div className="sm:block md:hidden grid gap-2 grid-cols-2 px-5 md:px-0 lg:px-10">
            <div className="">
              <Legal />
            </div>

            <div className="px-5 sm:px-0 lg:text-center">
              <div className="text-start">
                <QuickLinks />
              </div>
            </div>
          </div>
          <div className="text-center ">
            <div className="justify-center">
              <h2 className="mb-6 text-gray-300">Follow on:</h2>
              <div className="flex items-center justify-center gap-5">
                <SocialMedia
                  icon={faFacebookF}
                  bgColor={color}
                  size={20}
                  url="https://www.facebook.com/isoboye.vincent/"
                />
                <SocialMedia
                  icon={faInstagram}
                  bgColor={color}
                  size={20}
                  url="https://www.instagram.com/isoboye_vincent/"
                />
                <SocialMedia
                  icon={faXTwitter}
                  bgColor={color}
                  size={20}
                  url=""
                />
              </div>
            </div>
          </div>
        </div>

        <BottomFooter />
      </footer>
    </>
  );
};

export default Footer;
