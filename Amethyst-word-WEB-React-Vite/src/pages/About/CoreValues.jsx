import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/Card/Card';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const CoreValues = () => {
  return (
    <section className="py-16 px-4 bg-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800">
            Our Core Values
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            These principles guide everything we do, from design to delivery
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-fashion-purple-100 shadow-md">
            <CardHeader className="flex flex-col items-center pb-2">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-fashion-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-800">Quality & Craftsmanship</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>We obsess over every detail, ensuring our products are made to the highest standards and designed to last.</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-md">
            <CardHeader className="flex flex-col items-center pb-2">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-fashion-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-800">Innovation</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>We're constantly pushing boundaries, exploring new techniques, materials, and designs to stay ahead.</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-md">
            <CardHeader className="flex flex-col items-center pb-2">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-fashion-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-800">Sustainability</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>We're committed to ethical practices and reducing our environmental footprint at every stage.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;