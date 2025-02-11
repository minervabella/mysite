import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <main className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="prose prose-gray max-w-none p-6">
          <h1 className="text-4xl font-bold mb-6">About Minerva Bella</h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to Minerva Bella, your premier destination for exquisite ladies handbags that blend style, quality, and sophistication.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            At Minerva Bella, we believe that every woman deserves to carry a piece of luxury that reflects her unique personality and style. Our carefully curated collection of handbags represents the perfect fusion of contemporary design and timeless elegance.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to provide fashion-conscious women with high-quality handbags that not only complement their style but also meet their everyday needs. We strive to offer products that combine functionality with aesthetic appeal, ensuring that each bag is not just an accessory but a statement piece.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Quality Commitment</h2>
          <p>
            Each Minerva Bella handbag is crafted with attention to detail and quality. We carefully select materials and monitor the manufacturing process to ensure that every product meets our high standards of excellence.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
