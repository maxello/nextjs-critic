"use client";
 
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
 
  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-8 max-w-[400px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        id="search"
        className="block w-full rounded-md py-[9px] pl-10 text-sm"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchIcon className="absolute z-10 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" size={15} />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-slate-900" /> */}
    </div>
  );
}