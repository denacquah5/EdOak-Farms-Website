import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Sprout, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function MyFarms() {
  const farms = [
    {
      id: '1',
      name: 'Block A-14',
      type: 'Cassava Production',
      size: '5 Acres',
      location: 'Eastern Region Site',
      status: 'Active',
      stage: 'Crop Care (Month 3)',
      plantedDate: 'Jan 15, 2026',
      estHarvest: 'Oct 2026',
      progress: 35,
      image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">My Farms</h1>
          <p className="text-slate-500 mt-1">Manage and view details of your active farm blocks.</p>
        </div>
        <Button variant="outline">Download Report</Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {farms.map((farm) => (
          <Card key={farm.id} className="overflow-hidden border-none shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <img 
                  src={farm.image} 
                  alt={farm.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-emerald-700 shadow-sm uppercase tracking-wider">
                  {farm.status}
                </div>
              </div>
              
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{farm.name}</h3>
                      <p className="text-slate-500 font-medium">{farm.type} • {farm.size}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                        <p className="text-sm font-medium text-slate-900">{farm.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Sprout className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Stage</p>
                        <p className="text-sm font-medium text-slate-900">{farm.stage}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Est. Harvest</p>
                        <p className="text-sm font-medium text-slate-900">{farm.estHarvest}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress to Harvest</span>
                    <span className="text-sm font-bold text-[var(--color-primary)]">{farm.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-[var(--color-primary)] h-2.5 rounded-full" style={{ width: `${farm.progress}%` }}></div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" className="text-sm flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
