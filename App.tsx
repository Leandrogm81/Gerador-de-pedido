
import React, { useState } from 'react';

// --- Reusable UI Components ---

const SectionTitle: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
    <h2 className={`text-lg font-bold text-gray-800 mb-4 border-b pb-2 ${className}`}>{title}</h2>
);

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; }> = 
({ label, name, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
    </div>
);

// --- Purchase Order Specific Components ---

const Logo: React.FC<{ logoSrc: string | null }> = ({ logoSrc }) => {
    if (logoSrc) {
        return <img src={logoSrc} alt="Company Logo" className="h-32 w-auto mx-auto mb-2 object-contain" />;
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="h-28 w-auto mx-auto mb-2 text-sky-800">
            <path 
                d="M35 2 H 5 V 38 H 35 V 28 H 20 V 12 H 35 V 2 Z" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinejoin="round" 
            />
        </svg>
    );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="font-bold text-base text-sky-700 border-b-2 border-sky-700 pb-1 mb-3">{title}</h3>
);


// --- Purchase Order Preview Component ---

const PurchaseOrderPreview: React.FC<{ data: any; logoSrc: string | null }> = ({ data, logoSrc }) => (
    <div id="print-area" className="w-full mx-auto bg-white shadow-2xl p-12 border border-gray-300 font-sans text-sm text-gray-800">
        <header className="text-center mb-10">
            <Logo logoSrc={logoSrc} />
            <h1 className="text-2xl font-bold text-gray-800">Toldos Fortaleza</h1>
            <p className="text-base text-gray-500">Coberturas em Policarbonato</p>
            <h2 className="text-xl font-bold tracking-widest mt-8">PEDIDO DE COMPRA</h2>
        </header>

        <main>
            <p className="mb-8">Data: {data.date}</p>
            
            <section className="mb-6">
                <SectionHeader title="Contratado" />
                <div className="space-y-px">
                    <p>Leandro Gobbo Menezes - ME</p>
                    <p>Endereço: Avenida Araucária, 997</p>
                    <p>Bairro: Parque Novo Oratório – Santo André/SP CEP: 09251-040</p>
                    <p>Telefone: 11 2036-0010 / Fixo e WhatsApp</p>
                    <p>CNPJ: 07.173.998/0001-75 / Inscrição Estadual: 626.107.689.114</p>
                    <p>Site: www.toldosfortaleza.com / E-mail: toldosfortaleza@gmail.com</p>
                </div>
            </section>
            
            <section className="mb-6">
                <SectionHeader title="Contratante" />
                <div className="space-y-px">
                    <p>Nome: {data.clientName}</p>
                    <p>Endereço: {data.clientAddress}</p>
                    <p>Bairro: {data.clientNeighborhood}</p>
                    <p>Cidade: {data.clientCity}</p>
                    <p>Telefone: {data.clientPhone}</p>
                    <p>CPF: {data.clientCpf} / RG: {data.clientRg}</p>
                </div>
            </section>

            <section className="mb-6">
                <SectionHeader title="Produto(s)" />
                {data.products && data.products.map((product: any, index: number) => (
                    <div key={index} className={`space-y-px ${index < data.products.length - 1 ? 'mb-3 pb-3 border-b border-gray-200' : ''}`}>
                        <p><span className="font-semibold">Item {index + 1}:</span> {product.item}</p>
                        <p><span className="font-semibold">Estrutura:</span> {product.structure}</p>
                        <p><span className="font-semibold">Lona:</span> {product.material}</p>
                        <p><span className="font-semibold">Acessórios:</span> {product.accessories}</p>
                        <p><span className="font-semibold">Medida:</span> {product.measure}</p>
                    </div>
                ))}
            </section>

            <section className="space-y-2 text-sm my-8">
                <div className="border border-black p-2">
                    Valor R${data.productValue} – {data.productValueText}
                </div>
                <div className="border border-black p-2">
                    Forma de pagamento: {data.paymentMethod}
                </div>
                <div className="border border-black p-2">
                    Dados Bancários: Banco Itaú – Agência 4446 Conta 00047-5 / Pix: 07.173.998/0001-75
                </div>
            </section>

             <section className="space-y-px text-sm">
                <p>Prazo de Entrega: {data.deliveryTime}</p>
                <p>Garantia: 1 ano para comprovados defeitos de fabricação / placas / estrutura / fixação / calha e rufos / vedação</p>
            </section>
        </main>
        
        <footer className="text-left text-xs pt-8 mt-10">
            <div className="space-y-px">
                <p>Razão Social: Leandro Gobbo Menezes Me / Nome Fantasia: Toldos Fortaleza</p>
                <p>CNPJ: 07.173.998/0001-75 / Inscrição Estadual: 626.107.689.114</p>
                <p>Endereço: Av. Araucária, 997 Parque Novo Oratório - Santo André/SP – CEP: 09251-040</p>
                <p>Telefone e WhatsApp: 11 2036-0010</p>
                <p>Redes Sociais: Facebook @toldosfortalezaabc / Instagram: @toldosfortalezacoberturas</p>
                <p>Site: www.toldosfortaleza.com</p>
            </div>
        </footer>
    </div>
);


// --- Main App Component ---

const initialProduct = {
    item: '',
    structure: '',
    material: '',
    accessories: '',
    measure: '',
};

const App: React.FC = () => {
    const initialData = {
        date: '',
        clientName: '',
        clientAddress: '',
        clientNeighborhood: '',
        clientCity: '',
        clientPhone: '',
        clientCpf: '',
        clientRg: '',
        products: [{ ...initialProduct }],
        productValue: '',
        productValueText: '',
        paymentMethod: '',
        deliveryTime: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [logoSrc, setLogoSrc] = useState<string | null>(null);
    const [isPrinting, setIsPrinting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedProducts = formData.products.map((product, i) =>
            i === index ? { ...product, [name]: value } : product
        );
        setFormData(prev => ({ ...prev, products: updatedProducts }));
    };

    const handleAddProduct = () => {
        setFormData(prev => ({
            ...prev,
            products: [...prev.products, { ...initialProduct }]
        }));
    };

    const handleRemoveProduct = (index: number) => {
        if (formData.products.length <= 1) return;
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, products: updatedProducts }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setLogoSrc(loadEvent.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoSrc(null);
        const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };


    const handlePrint = () => {
        const printElement = document.getElementById('print-area');
        if (!printElement) {
            console.error("Element with id 'print-area' not found.");
            return;
        }

        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;

        if (!jsPDF || !html2canvas) {
            console.error("jsPDF or html2canvas not loaded from CDN.");
            alert("Erro ao carregar bibliotecas para gerar PDF. Por favor, recarregue a página.");
            return;
        }

        setIsPrinting(true);

        const clone = printElement.cloneNode(true) as HTMLElement;
        const tempContainer = document.createElement('div');
        
        const a4WidthPx = 794; 
        
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0px';
        tempContainer.style.width = `${a4WidthPx}px`;
        
        document.body.appendChild(tempContainer);
        tempContainer.appendChild(clone);

        html2canvas(clone, {
            scale: 2,
            useCORS: true,
        }).then((canvas: HTMLCanvasElement) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = canvas.width / canvas.height;

            const margin = 10;
            let imgWidth = pdfWidth - (margin * 2);
            let imgHeight = imgWidth / ratio;
            
            if (imgHeight > pdfHeight - (margin * 2)) {
              imgHeight = pdfHeight - (margin * 2);
              imgWidth = imgHeight * ratio;
            }

            const x = (pdfWidth - imgWidth) / 2;
            const y = margin;

            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            pdf.save('pedido-de-compra.pdf');
        }).catch((error: any) => {
            console.error('Error generating PDF: ', error);
            alert('Ocorreu um erro ao gerar o PDF.');
        }).finally(() => {
            if (document.body.contains(tempContainer)) {
                document.body.removeChild(tempContainer);
            }
            setIsPrinting(false);
        });
    };

    const handleReset = () => {
        setFormData(initialData);
        handleRemoveLogo();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
             <header className="bg-white shadow-md p-4 sticky top-0 z-10 border-b">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-800">Gerador de Pedido</h1>
                    <div className="flex gap-2">
                         <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                            Limpar
                        </button>
                        <button 
                            onClick={handlePrint} 
                            disabled={isPrinting}
                            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPrinting ? 'Gerando PDF...' : 'Imprimir / Gerar PDF'}
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
                    <form className="space-y-8">
                        <div>
                            <SectionTitle title="Detalhes da Empresa" className="mb-2" />
                            <div className="space-y-2">
                                <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700">Logotipo</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/svg+xml"
                                        onChange={handleLogoChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                                    />
                                    {logoSrc && (
                                        <button type="button" onClick={handleRemoveLogo} className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors" aria-label="Remover logotipo">
                                            X
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <SectionTitle title="Dados Gerais" className="mb-2"/>
                            <InputField label="Data do Pedido" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div>
                            <SectionTitle title="Contratante" className="mb-2" />
                            <div className="space-y-4">
                                <InputField label="Nome Completo" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Ex: Lygia Barros Fagundes"/>
                                <InputField label="Endereço" name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Ex: Rua Aquário, 259"/>
                                <InputField label="Bairro" name="clientNeighborhood" value={formData.clientNeighborhood} onChange={handleInputChange} placeholder="Ex: Vila Guiomar"/>
                                <InputField label="Cidade / CEP" name="clientCity" value={formData.clientCity} onChange={handleInputChange} placeholder="Ex: Santo André/SP - CEP: 09071-070"/>
                                <InputField label="Telefone" name="clientPhone" value={formData.clientPhone} onChange={handleInputChange} placeholder="Ex: 11 94433-2782"/>
                                <InputField label="CPF" name="clientCpf" value={formData.clientCpf} onChange={handleInputChange} placeholder="Ex: 304.121.098-32"/>
                                <InputField label="RG" name="clientRg" value={formData.clientRg} onChange={handleInputChange} placeholder="Ex: 28.152.649-7"/>
                            </div>
                        </div>
                        <div>
                            <SectionTitle title="Produtos" className="mb-2"/>
                            {formData.products.map((product, index) => (
                                <div key={index} className="space-y-4 border border-gray-200 p-4 rounded-lg mb-4 relative">
                                    <div className="flex justify-between items-center">
                                         <h4 className="font-semibold text-gray-700">Produto {index + 1}</h4>
                                         {formData.products.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveProduct(index)} 
                                                className="p-1 text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center"
                                                aria-label={`Remover Produto ${index + 1}`}
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                    <InputField label="Item" name="item" value={product.item} onChange={(e) => handleProductChange(index, e)} />
                                    <InputField label="Estrutura e Acabamento" name="structure" value={product.structure} onChange={(e) => handleProductChange(index, e)} />
                                    <InputField label="Material (Lona)" name="material" value={product.material} onChange={(e) => handleProductChange(index, e)} />
                                    <InputField label="Acessórios" name="accessories" value={product.accessories} onChange={(e) => handleProductChange(index, e)} />
                                    <InputField label="Medida" name="measure" value={product.measure} onChange={(e) => handleProductChange(index, e)} placeholder="Ex: 5,60X1,40"/>
                                </div>
                            ))}
                             <button
                                type="button"
                                onClick={handleAddProduct}
                                className="mt-2 w-full px-4 py-2 text-sm font-medium text-sky-700 bg-sky-100 rounded-md hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                            >
                                + Adicionar Produto
                            </button>
                        </div>
                         <div>
                            <SectionTitle title="Valor e Pagamento" className="mb-2"/>
                             <div className="space-y-4">
                                <InputField label="Valor Total (R$)" name="productValue" value={formData.productValue} onChange={handleInputChange} placeholder="Ex: 2000,00"/>
                                <InputField label="Valor por Extenso" name="productValueText" value={formData.productValueText} onChange={handleInputChange} placeholder="Ex: Dois mil reais"/>
                                <InputField label="Forma de Pagamento" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} placeholder="Ex: Sinal de R$1.000..."/>
                                <InputField label="Prazo de Entrega" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} placeholder="Ex: 20 dias"/>
                            </div>
                        </div>
                    </form>
                </div>
                
                {/* Preview Section */}
                <div className="lg:col-span-3 bg-gray-200 p-8 rounded-lg shadow-inner overflow-y-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
                    <PurchaseOrderPreview data={formData} logoSrc={logoSrc} />
                </div>
            </main>
        </div>
    );
};

export default App;
