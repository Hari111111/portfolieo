'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import Signin from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react/dist/iconify.js'
import { SuccessfullLogin } from '@/components/Auth/AuthDialog/SuccessfulLogin'
import { FailedLogin } from '@/components/Auth/AuthDialog/FailedLogin'
import { UserRegistered } from '@/components/Auth/AuthDialog/UserRegistered'
import AuthDialogContext from '@/app/context/AuthDialogContext'

const Header: React.FC = () => {
  const pathUrl = usePathname()
  const { theme, setTheme } = useTheme()

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  const navbarRef = useRef<HTMLDivElement>(null)
  const signInRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false)
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false)
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }

    // First-time visitor popup logic
    if (typeof window !== 'undefined') {
      const hasSeenPopup = localStorage.getItem('hasSeenAuthPopup');
      if (!hasSeenPopup && !userInfo) {
        const timer = setTimeout(() => {
          setIsSignInOpen(true);
          localStorage.setItem('hasSeenAuthPopup', 'true');
        }, 3000); // Show popup after 3 seconds
        return () => clearTimeout(timer);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen, isSignInOpen, isSignUpOpen])

  const path = usePathname()

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen])

  const authDialog = useContext(AuthDialogContext)

  return (
    <header
      className={`fixed h-20 top-0 z-[9999] w-full transition-all duration-500 ${sticky
        ? 'shadow-lg bg-white/95 dark:bg-darklight/95 backdrop-blur-md border-b border-border dark:border-dark_border'
        : 'bg-white/50 dark:bg-darkmode/20 backdrop-blur-sm border-b border-white/10 dark:border-transparent'
        }`}>
      <div className='container mx-auto max-w-7xl flex items-center justify-between px-6 h-full'>
        <Logo />
        <nav className='hidden lg:flex grow items-center justify-center gap-6 xl:gap-8'>
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className='flex items-center gap-4'>
          <button
            aria-label='Toggle theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white'>
            <svg
              viewBox='0 0 16 16'
              className={`hidden h-6 w-6 dark:block ${!sticky && pathUrl === '/' && 'text-white'
                }`}>
              <path
                d='M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z'
                fill='#FFFFFF'
              />
            </svg>
            <svg
              viewBox='0 0 23 23'
              className={`h-8 w-8 text-dark dark:hidden ${!sticky && pathUrl === '/' && 'text-white'
                }`}>
              <path d='M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z' />
            </svg>
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 py-1.5 px-3 rounded-full border border-slate-100 dark:border-white/10">
                <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-black text-midnight_text dark:text-white uppercase tracking-tight hidden sm:block">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <Icon icon="solar:logout-3-bold-duotone" width="22" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href='#'
                className='hidden lg:block bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'
                onClick={() => {
                  setIsSignInOpen(true)
                }}>
                Sign In
              </Link>
              <Link
                href='#'
                className='hidden lg:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700'
                onClick={() => {
                  setIsSignUpOpen(true)
                }}>
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='flex items-center gap-2 lg:hidden p-2 rounded-xl group transition-all hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95'
            aria-label='Toggle mobile menu'>
            <span className="text-[10px] font-black text-midnight_text dark:text-white uppercase tracking-widest block">Menu</span>
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`block h-0.5 rounded-full bg-midnight_text dark:bg-white transition-all duration-300 ${navbarOpen ? 'w-6' : 'w-6'}`}></span>
              <span className={`block h-0.5 rounded-full bg-primary transition-all duration-300 ${navbarOpen ? 'w-4' : 'w-4'}`}></span>
              <span className={`block h-0.5 rounded-full bg-midnight_text dark:bg-white transition-all duration-300 ${navbarOpen ? 'w-6' : 'w-2'}`}></span>
            </div>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className='fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm z-[9998]' onClick={() => setNavbarOpen(false)} />
      )}

      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] bg-white dark:bg-darklight transform transition-all duration-500 ease-in-out ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-[99999] shadow-[0_0_50px_rgba(0,0,0,0.15)] border-l border-border dark:border-dark_border`}>
        <div className='flex flex-col h-full bg-white dark:bg-darklight'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/10'>
            <div className="flex flex-col">
              <h2 className='text-lg font-black text-midnight_text dark:text-white uppercase tracking-tighter italic'>
                System <span className="text-primary">Menu</span>
              </h2>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">V4.2.0 • PROTOCOL</span>
            </div>
            <button
              onClick={() => setNavbarOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:text-primary rounded-full transition-all"
              aria-label='Close mobile menu'>
              <Icon icon="solar:close-circle-bold-duotone" width="28" />
            </button>
          </div>
          
          {/* Navigation Items */}
          <nav className='flex-1 overflow-y-auto p-6 bg-white dark:bg-darklight'>
            <div className="space-y-2">
              {headerData.map((item, index) => (
                <MobileHeaderLink 
                  key={index} 
                  item={item} 
                  onClick={() => setNavbarOpen(false)} 
                />
              ))}
            </div>

            <div className='mt-10 pt-8 border-t border-slate-100 dark:border-white/10'>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-base shadow-lg shadow-primary/20">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-black text-midnight_text dark:text-white uppercase tracking-tight truncate">
                        {user.name}
                      </span>
                      <span className="text-[9px] text-primary font-black uppercase tracking-widest">Active Member</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 bg-red-500/10 text-red-500 p-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Icon icon="solar:logout-3-bold-duotone" width="20" />
                    Close Session
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    className='w-full p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-midnight_text dark:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary transition-all'
                    onClick={() => {
                      setIsSignInOpen(true)
                      setNavbarOpen(false)
                    }}>
                    Auth Access
                  </button>
                  <button
                    className='w-full p-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20'
                    onClick={() => {
                      setIsSignUpOpen(true)
                      setNavbarOpen(false)
                    }}>
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Footer Branding */}
          <div className="p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-center">
             <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.4em]">Locked & Encrypted</p>
          </div>
        </div>
      </div>

      {/* Successsful Login Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isSuccessDialogOpen == true ? 'block' : 'hidden'
          }`}>
        <SuccessfullLogin />
      </div>
      {/* Failed Login Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isFailedDialogOpen == true ? 'block' : 'hidden'
          }`}>
        <FailedLogin />
      </div>
      {/* User registration Alert */}
      <div
        className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isUserRegistered == true ? 'block' : 'hidden'
          }`}>
        <UserRegistered />
      </div>

      {/* Centered Auth Modals */}
      {isSignInOpen && (
        <div className='fixed inset-0 w-screen h-screen bg-midnight_text/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn'>
          <div
            ref={signInRef}
            className='relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-12 shadow-2xl border border-white'>
            <button
              onClick={() => setIsSignInOpen(false)}
              className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300 group z-50'
              aria-label='Close Sign In Modal'>
              <Icon
                icon='ic:round-close'
                className='text-2xl group-hover:rotate-90 transition-transform duration-300'
              />
            </button>
            <Signin
              toggleSignUp={() => {
                setIsSignInOpen(false);
                setIsSignUpOpen(true);
              }}
              signInOpen={(value: boolean) => setIsSignInOpen(value)}
            />
          </div>
        </div>
      )}

      {isSignUpOpen && (
        <div className='fixed inset-0 w-screen h-screen bg-midnight_text/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn'>
          <div
            ref={signUpRef}
            className='relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-12 shadow-2xl border border-white'>
            <button
              onClick={() => setIsSignUpOpen(false)}
              className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300 group z-50'
              aria-label='Close Sign Up Modal'>
              <Icon
                icon='ic:round-close'
                className='text-2xl group-hover:rotate-90 transition-transform duration-300'
              />
            </button>
            <SignUp
              toggleSignIn={() => {
                setIsSignUpOpen(false);
                setIsSignInOpen(true);
              }}
              signUpOpen={(value: boolean) => setIsSignUpOpen(value)}
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
