import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import LoginForm from '@/app/ui/LoginForm';
 
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:h-screen px-5">
      <div className="relative mx-auto flex w-full max-w-[400px] items-center flex-col space-y-2.5 pt-4 md:-mt-32">
        <div className="text-sky-600 dark:text-sky-400">
          <ChatBubbleLeftEllipsisIcon aria-hidden="true" className="size-8 mr-2" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}