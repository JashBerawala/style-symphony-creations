
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useToast } from "@/components/ui/use-toast";
import { mockLogin, mockRegister } from '@/services/mockData';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await mockLogin(email, password);
      toast({
        title: "Login successful!",
        description: "Welcome back to StyleVerse.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string, role: 'customer' | 'designer') => {
    setLoading(true);
    try {
      await mockRegister(name, email, password, role);
      toast({
        title: "Registration successful!",
        description: "Welcome to StyleVerse.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="space-y-4">
            <h1 className="text-4xl font-serif text-fashion-purple">StyleVerse</h1>
            <p className="text-xl text-gray-600">Where your custom fashion dreams come to life.</p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-fashion-purple flex items-center justify-center text-white">1</div>
                <p>Create a custom fashion request</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-fashion-purple flex items-center justify-center text-white">2</div>
                <p>Receive proposals from talented designers</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-fashion-purple flex items-center justify-center text-white">3</div>
                <p>Chat directly with your chosen designer</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-fashion-purple flex items-center justify-center text-white">4</div>
                <p>Track progress until your custom piece is delivered</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
