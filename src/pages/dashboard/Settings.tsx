import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Lock, Bell, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

import { useNavigate } from 'react-router-dom';

export function Settings() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setSuccessMsg('');
    
    try {
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Also update in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName
      });
      
      setSuccessMsg('Profile updated successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendVerification = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setVerificationSent(true);
      setTimeout(() => setVerificationSent(false), 5000);
    } catch (error) {
      console.error("Error sending verification:", error);
    }
  };

  const handleUpgradeToAdmin = async () => {
    if (!user) return;
    setIsUpgrading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        role: 'admin',
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User'
      }, { merge: true });
      
      alert("Successfully upgraded to Admin! Redirecting to dashboard...");
      
      // Use window.location.href instead of navigate to force a full page reload.
      // This prevents a race condition where React Router navigates to /admin
      // before the AuthContext onSnapshot has time to update the profile.role to 'admin',
      // which would cause the ProtectedRoute to bounce the user back to /dashboard.
      window.location.href = '/admin';
    } catch (error: any) {
      console.error("Error upgrading to admin:", error);
      alert(`Failed to upgrade: ${error.message || 'Unknown error'}`);
      setIsUpgrading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-white">
            <User className="w-5 h-5 mr-3" />
            Profile Information
          </button>
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </button>
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
            <Shield className="w-5 h-5 mr-3" />
            Security
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {successMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {successMsg}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Input 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={user?.email || ''}
                      disabled
                      className="bg-slate-50 text-slate-500 flex-1"
                    />
                    {user?.emailVerified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Verified
                      </span>
                    ) : (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleSendVerification}
                        disabled={verificationSent}
                      >
                        {verificationSent ? 'Sent!' : 'Verify Email'}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed directly. Contact support for assistance.</p>
                </div>

                <div className="pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Admin Access Section for the Default Admin */}
          {user?.email === 'denacquah5@gmail.com' && profile?.role !== 'admin' && (
            <Card className="border-none shadow-sm bg-amber-50 border border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-800 mb-4">
                  Your email is designated as the default platform administrator. 
                  Click the button below to upgrade your account to access the admin dashboard.
                </p>
                <Button 
                  onClick={handleUpgradeToAdmin}
                  disabled={isUpgrading}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isUpgrading ? 'Upgrading...' : 'Upgrade to Admin Role'}
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Change Password</p>
                  <p className="text-sm text-slate-500">Update your password to keep your account secure.</p>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
