import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LogIn, Mail, Lock, Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpType, setOtpType] = useState<'sms' | 'signup'>('sms');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  const { 
    user, 
    signUp, 
    signIn, 
    signInWithGoogle, 
    signInWithFacebook,
    signUpWithPhone,
    signInWithPhone,
    verifyOtp,
    resendOtp
  } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Success!",
            description: "Please check your email to verify your account.",
          });
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      let error;
      if (isSignUp) {
        const result = await signUpWithPhone(formData.phone, formData.name);
        error = result.error;
        setOtpType('signup');
      } else {
        const result = await signInWithPhone(formData.phone);
        error = result.error;
        setOtpType('sms');
      }

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setShowOtp(true);
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${formData.phone}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await verifyOtp(formData.phone, otp, otpType);
      if (error) {
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Phone number verified successfully",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Invalid verification code",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const { error } = await resendOtp(formData.phone, otpType);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "OTP Resent",
          description: `New verification code sent to ${formData.phone}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Google authentication failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleFacebookAuth = async () => {
    const { error } = await signInWithFacebook();
    if (error) {
      toast({
        title: "Facebook authentication failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (showOtp) {
    return (
      <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-md w-full space-y-8">
          <div className="text-center transform animate-slide-in-up">
            <Link to="/" className="text-3xl font-bold text-white hover:text-gray-200 transition-colors duration-300">
              YUTH
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-white animate-fade-in delay-300">
              Verify your phone
            </h2>
            <p className="mt-2 text-sm text-gray-200 animate-fade-in delay-500">
              Enter the 6-digit code sent to {formData.phone}
            </p>
          </div>

          <Card className="mt-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 transform animate-scale-in delay-200">
            <CardContent className="space-y-6 pt-6">
              <Button
                variant="ghost"
                onClick={() => setShowOtp(false)}
                className="mb-4 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="space-y-4 animate-fade-in delay-700">
                <Label htmlFor="otp" className="text-center block text-lg font-medium">Verification Code</Label>
                <div className="flex justify-center transform animate-bounce-in delay-1000">
                  <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                      <InputOTPSlot index={4} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                      <InputOTPSlot index={5} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 focus:border-black transition-all duration-200 hover:shadow-md" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button 
                onClick={handleOtpVerify} 
                className="w-full h-12 text-lg font-semibold bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-1200" 
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Code'
                )}
              </Button>

              <div className="text-center animate-fade-in delay-1400">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-black hover:text-gray-800 font-medium transition-colors duration-200 hover:underline"
                  disabled={loading}
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center transform animate-slide-in-up">
          <Link to="/" className="text-3xl font-bold text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 inline-block">
            YUTH
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white animate-fade-in delay-300">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-200 animate-fade-in delay-500">
            {isSignUp 
              ? 'Join YUTH and discover amazing fashion' 
              : 'Sign in to your account to continue shopping'
            }
          </p>
        </div>

        <Card className="mt-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 transform animate-scale-in delay-200">
          <CardHeader className="space-y-1 animate-fade-in delay-400">
            <CardTitle className="text-2xl text-center font-bold">
              {isSignUp ? 'Sign up' : 'Sign in'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3 animate-fade-in delay-600">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:border-black transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:border-black transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                onClick={handleFacebookAuth}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            <div className="relative animate-fade-in delay-700">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Auth Method Tabs */}
            <div className="animate-fade-in delay-800">
              <Tabs value={authMethod} onValueChange={(value: string) => setAuthMethod(value as 'email' | 'phone')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 rounded-lg p-1">
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center space-x-2 h-10 font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="phone" 
                    className="flex items-center space-x-2 h-10 font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="mt-6 animate-slide-in-left">
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    {isSignUp && (
                      <div className="space-y-2 animate-fade-in delay-900">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-11 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2 animate-fade-in delay-1000">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-11 pl-10 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                          required
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2 animate-fade-in delay-1100">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="h-11 pl-10 pr-10 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="space-y-2 animate-fade-in delay-1200">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="h-11 pl-10 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    )}

                    {!isSignUp && (
                      <div className="flex items-center justify-between animate-fade-in delay-1200">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded transition-all duration-200"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                          </label>
                        </div>
                        <div className="text-sm">
                          <a href="#" className="font-medium text-black hover:text-gray-800 transition-colors duration-200 hover:underline">
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-1300" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          {isSignUp ? 'Create Account' : 'Sign In'}
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="phone" className="mt-6 animate-slide-in-right">
                  <form onSubmit={handlePhoneSubmit} className="space-y-5">
                    {isSignUp && (
                      <div className="space-y-2 animate-fade-in delay-900">
                        <Label htmlFor="phoneSignUpName" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="phoneSignUpName"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-11 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2 animate-fade-in delay-1000">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number (e.g., +1234567890)"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-11 pl-10 border-2 focus:border-black transition-all duration-200 hover:shadow-md"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Please include country code (e.g., +1 for US, +44 for UK)
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-1100" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <Phone className="w-4 h-4 mr-2" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            <div className="text-center animate-fade-in delay-1400">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-black hover:text-gray-800 font-medium transition-all duration-200 hover:underline hover:scale-105"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center animate-fade-in delay-1500">
          <p className="text-xs text-gray-300">
            By continuing, you agree to YUTH's{' '}
            <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
