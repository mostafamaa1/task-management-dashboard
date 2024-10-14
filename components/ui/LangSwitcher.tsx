// 'use client'
// import { useRouter } from 'next/router';

// const LangSwitcher = () => {
//   const router = useRouter();
//   const { locale } = router;

//   const changeLanguage = (lang: string) => {
//     router.push(router.pathname, router.asPath, { locale: lang });
//   };

//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('ar')}>العربية</button>
//     </div>
//   );
// };

// export default LangSwitcher;
'use client';
import Link from 'next/link';
import { Button } from './button'; // Assuming Button is your custom button component
import { ChangeEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const LangSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value)
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <label className='border-2 rounded'>
      <p className='sr-only'>Change Language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}>
        <option value='en'>English</option>
        <option value='ar'>Arabic</option>
      </select>
    </label>
    // <div className="flex gap-2">
    //   <Link href={pathname} locale="en">
    //     <Button onClick={}>EN</Button>
    //   </Link>
    //   <Link href={pathname} locale="ar">
    //     <Button onClick={}>AR</Button>
    //   </Link>
    // </div>
  );
};

export default LangSwitcher;
