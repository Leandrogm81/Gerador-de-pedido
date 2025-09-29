
import React, { useState, useEffect } from 'react';

// --- Reusable UI Components ---

const SectionTitle: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
    <h2 className={`text-lg font-bold text-gray-800 mb-4 border-b pb-2 ${className}`}>{title}</h2>
);

const InputField: React.FC<{ 
    label: string; 
    name: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    placeholder?: string;
    [key: string]: any;
 }> = 
({ label, name, value, onChange, placeholder, ...rest }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-gray-200 disabled:cursor-not-allowed"
            {...rest}
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
                    Valor R${data.productValue.replace('R$', '').trim()} – {data.productValueText}
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

// --- Helper Functions ---

const numberToWordsPtBr = (num: number): string => {
    if (num === null || num === undefined) return '';
    
    const units = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const teens = ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const tens = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    const getExtensive = (n: number): string => {
        if (n === 0) return "";
        if (n === 100) return "cem";

        let str = "";
        const c = Math.floor(n / 100);
        const d = Math.floor((n % 100) / 10);
        const u = n % 10;

        if (c > 0) {
            str += hundreds[c];
            if (d > 0 || u > 0) str += " e ";
        }
        if (d === 1 && u > 0) {
            str += teens[u];
        } else {
            if (d > 0) {
                str += tens[d];
                if (u > 0) str += " e ";
            }
            if (u > 0) {
                str += units[u];
            }
        }
        return str;
    };

    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    
    let result = "";

    if (integerPart > 0) {
        const thousands = Math.floor(integerPart / 1000);
        const rest = integerPart % 1000;
        
        if (thousands > 0) {
            if (thousands === 1) {
                result += "mil";
            } else {
                result += getExtensive(thousands) + " mil";
            }
            if (rest > 0) result += (rest < 100 || rest % 100 === 0) ? " e " : " ";
        }

        result += getExtensive(rest);
        result += integerPart === 1 ? " real" : " reais";
    }

    if (decimalPart > 0) {
        if (integerPart > 0) result += " e ";
        result += getExtensive(decimalPart);
        result += decimalPart === 1 ? " centavo" : " centavos";
    }

    if (result === "") return "zero";
    
    return result.charAt(0).toUpperCase() + result.slice(1);
};


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
        clientCep: '',
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
    const [isFetchingCep, setIsFetchingCep] = useState(false);
    const [deliveryTimeType, setDeliveryTimeType] = useState<'days' | 'date'>('days');

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        setFormData(prev => ({...prev, date: `${day}/${month}/${year}`}));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;
        const numbersOnly = value.replace(/\D/g, '');

        if (name === 'clientCpf') {
            formattedValue = numbersOnly
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .slice(0, 14);
        } else if (name === 'clientPhone') {
             if (numbersOnly.length <= 10) {
                formattedValue = numbersOnly
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{4})(\d)/, '$1-$2')
                    .slice(0, 14);
            } else {
                formattedValue = numbersOnly
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{5})(\d)/, '$1-$2')
                    .slice(0, 15);
            }
        } else if (name === 'clientCep') {
            formattedValue = numbersOnly
                .replace(/(\d{5})(\d)/, '$1-$2')
                .slice(0, 9);
        } else if (name === 'date') {
            formattedValue = numbersOnly
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .slice(0, 10);
        } else if (name === 'deliveryTime') {
            if (deliveryTimeType === 'date') {
                 if (value) { // value from date picker is 'YYYY-MM-DD'
                    const [year, month, day] = value.split('-');
                    formattedValue = `${day}/${month}/${year}`;
                } else {
                    formattedValue = '';
                }
            } else { // deliveryTimeType is 'days'
                const dayValue = value.replace(/\D/g, '');
                formattedValue = dayValue ? `${dayValue} dias` : '';
            }
            setFormData(prev => ({ ...prev, [name]: formattedValue }));
            return; 
        } else if (name === 'productValue') {
            if (numbersOnly === '') {
                setFormData(prev => ({ ...prev, productValue: '', productValueText: '' }));
                return;
            }
            const numberValue = parseInt(numbersOnly, 10) / 100;
            const currencyValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
            const textValue = numberToWordsPtBr(numberValue);

            setFormData(prev => ({ ...prev, productValue: currencyValue, productValueText: textValue }));
            return;
        }
        
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };
    
    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        setIsFetchingCep(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('CEP not found');
            const data = await response.json();
            if (data.erro) {
                console.error("CEP inválido ou não encontrado.");
                return;
            }

            setFormData(prev => ({
                ...prev,
                clientAddress: data.logradouro || '',
                clientNeighborhood: data.bairro || '',
                clientCity: `${data.localidade || ''}/${data.uf || ''}`,
            }));
            document.getElementById('clientAddress')?.focus();
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        } finally {
            setIsFetchingCep(false);
        }
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

    const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value as 'days' | 'date';
        setDeliveryTimeType(newType);
        setFormData(prev => ({ ...prev, deliveryTime: '' }));
    };

    const handleQuickDays = (days: number) => {
        setFormData(prev => ({ ...prev, deliveryTime: `${days} dias` }));
    };

    const formatDisplayDateForInput = (dateStr: string): string => {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return '';
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
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
                                <InputField label="CEP" name="clientCep" value={formData.clientCep} onChange={handleInputChange} onBlur={handleCepBlur} placeholder="Ex: 09251-040"/>
                                <InputField label="Endereço" name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Ex: Avenida Araucária, 997" disabled={isFetchingCep} />
                                <InputField label="Bairro" name="clientNeighborhood" value={formData.clientNeighborhood} onChange={handleInputChange} placeholder="Ex: Parque Novo Oratório" disabled={isFetchingCep} />
                                <InputField label="Cidade / Estado" name="clientCity" value={formData.clientCity} onChange={handleInputChange} placeholder="Ex: Santo André/SP" disabled={isFetchingCep} />
                                <InputField label="Telefone" name="clientPhone" value={formData.clientPhone} onChange={handleInputChange} placeholder="Ex: (11) 2036-0010"/>
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
                                <InputField label="Valor por Extenso" name="productValueText" value={formData.productValueText} onChange={() => {}} placeholder="Gerado automaticamente" readOnly className="bg-gray-100"/>
                                <InputField label="Forma de Pagamento" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} placeholder="Ex: Sinal de R$1.000..."/>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prazo de Entrega</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="deliveryType" value="days" checked={deliveryTimeType === 'days'} onChange={handleDeliveryTypeChange} className="form-radio h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"/>
                                            <span className="ml-2 text-sm text-gray-700">Em dias</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="deliveryType" value="date" checked={deliveryTimeType === 'date'} onChange={handleDeliveryTypeChange} className="form-radio h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"/>
                                            <span className="ml-2 text-sm text-gray-700">Data específica</span>
                                        </label>
                                    </div>

                                    {deliveryTimeType === 'days' && (
                                        <div className="mt-2">
                                            <InputField 
                                                label="Número de Dias"
                                                name="deliveryTime" 
                                                value={formData.deliveryTime.replace(/\s*dias/i, '')}
                                                onChange={handleInputChange} 
                                                placeholder="Ex: 20"
                                                type="number"
                                            />
                                            <div className="mt-2 flex gap-2">
                                                {[20, 25, 30].map(days => (
                                                    <button 
                                                        key={days}
                                                        type="button"
                                                        onClick={() => handleQuickDays(days)}
                                                        className="px-3 py-1 text-sm font-medium text-sky-700 bg-sky-100 rounded-md hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition-colors"
                                                    >
                                                        {days} dias
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {deliveryTimeType === 'date' && (
                                        <div className="mt-2">
                                            <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Data Específica</label>
                                            <input
                                                type="date"
                                                id="deliveryDate"
                                                name="deliveryTime"
                                                value={formatDisplayDateForInput(formData.deliveryTime)}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
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
