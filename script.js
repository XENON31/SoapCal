// تعريف المواد الخام
const materials = [
    { id: 1, name: "الزيت المستعمل", pricePerKg: 0, quantity: 0 },
    { id: 2, name: "زيت عباد الشمس", pricePerKg: 0, quantity: 0 },
    { id: 3, name: "زيت زهرة القطن", pricePerKg: 0, quantity: 0 },
    { id: 4, name: "الشحم الحيواني او الودك", pricePerKg: 0, quantity: 0 },
    { id: 5, name: "الصودة الكاوية", pricePerKg: 0, quantity: 0 },
    { id: 6, name: "سكر", pricePerKg: 0, quantity: 0 },
    { id: 7, name: "ملح", pricePerKg: 0, quantity: 0 },
    { id: 8, name: "معزز رغوة", pricePerKg: 0, quantity: 0 },
    { id: 9, name: "لون", pricePerKg: 0, quantity: 0 },
    { id: 10, name: "مبيض", pricePerKg: 0, quantity: 0 },
    { id: 11, name: "عطر", pricePerKg: 0, quantity: 0 }
];

// تهيئة الجدول
function initializeTable() {
    const tableBody = document.querySelector('#materialsTable tbody');
    tableBody.innerHTML = '';
    
    materials.forEach(material => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${material.name}</td>
            <td>
                <input type="number" id="price-${material.id}" min="0" step="0.01" value="${material.pricePerKg}" placeholder="السعر">
            </td>
            <td>
                <input type="number" id="qty-${material.id}" min="0" step="1" value="${material.quantity}" placeholder="الجرامات">
            </td>
            <td id="cost-${material.id}">0.00 جنيه</td>
        `;
        
        tableBody.appendChild(row);
        
        // إضافة مستمعي الأحداث
        document.getElementById(`price-${material.id}`).addEventListener('input', updateMaterialCost);
        document.getElementById(`qty-${material.id}`).addEventListener('input', updateMaterialCost);
    });
}

// تحديث تكلفة المادة
function updateMaterialCost(event) {
    const inputId = event.target.id;
    const materialId = parseInt(inputId.split('-')[1]);
    const material = materials.find(m => m.id === materialId);
    
    if (inputId.startsWith('price-')) {
        material.pricePerKg = parseFloat(event.target.value) || 0;
    } else if (inputId.startsWith('qty-')) {
        material.quantity = parseFloat(event.target.value) || 0;
    }
    
    // حساب تكلفة المادة
    const cost = (material.pricePerKg * material.quantity) / 1000;
    document.getElementById(`cost-${materialId}`).textContent = cost.toFixed(2) + ' جنيه';
}

// حساب التكاليف الإجمالية
function calculateCosts() {
    // حساب تكلفة الخلطة الإجمالية
    let totalMixtureCost = 0;
    materials.forEach(material => {
        totalMixtureCost += (material.pricePerKg * material.quantity) / 1000;
    });
    
    // الحصول على عدد الصابون الناتج
    const soapOutput = parseInt(document.getElementById('soapOutput').value) || 1;
    
    // الحصول على عدد الصابون في الباكت
    const soapPerPack = parseInt(document.getElementById('soapPerPack').value) || 27;
    
    // الحصول على تكلفة تغليف الباكت
    const packagingCost = parseFloat(document.getElementById('packagingCost').value) || 0;
    
    // الحصول على نسبة الربح
    const profitMargin = parseFloat(document.getElementById('profitMargin').value) || 0;
    
    // حساب تكلفة الصابونة الواحدة
    const unitCost = totalMixtureCost / soapOutput;
    
    // حساب تكلفة إنتاج الباكت (بدون الربح)
    const packProductionCost = (unitCost * soapPerPack) + packagingCost;
    
    // حساب سعر بيع الباكت للمستهلك (بعد إضافة الربح)
    const packSalePrice = packProductionCost * (1 + (profitMargin / 100));
    
    // تحديث النتائج
    document.getElementById('totalMixtureCost').textContent = totalMixtureCost.toFixed(2) + ' جنيه';
    document.getElementById('unitCost').textContent = unitCost.toFixed(2) + ' جنيه';
    document.getElementById('packProductionCost').textContent = packProductionCost.toFixed(2) + ' جنيه';
    document.getElementById('packSalePrice').textContent = packSalePrice.toFixed(2) + ' جنيه';
    
    // عرض رسالة ذكية من الذكاء الاصطناعي
    showAIMessage(totalMixtureCost, unitCost, packProductionCost, packSalePrice, profitMargin);
}

// عرض رسالة الذكاء الاصطناعي
function showAIMessage(totalMixtureCost, unitCost, packProductionCost, packSalePrice, profitMargin) {
    const aiMessage = document.querySelector('.ai-message');
    
    let message = "";
    if (unitCost < 1) {
        message = "تكلفة الإنتاج منخفضة جداً! هذا رائع لتحقيق هامش ربح كبير.";
    } else if (unitCost < 3) {
        message = "تكلفة الإنتاج معقولة. يمكنك تحقيق ربح جيد مع التسعير المناسب.";
    } else {
        message = "تكلفة الإنتاج مرتفعة. قد تحتاج لمراجعة نسب المواد أو البحث عن موردين بأسعار أفضل.";
    }
    
    message += ` إجمالي تكلفة الخلطة: ${totalMixtureCost.toFixed(2)} جنيه، تكلفة الصابونة: ${unitCost.toFixed(2)} جنيه.`;
    message += ` نسبة الربح المطبقة: ${profitMargin}%`;
    
    aiMessage.textContent = message;
    
    // إضافة تأثير مرئي
    const aiSection = document.querySelector('.ai-intelligence');
    aiSection.style.animation = 'none';
    setTimeout(() => {
        aiSection.style.animation = 'pulse 2s infinite';
    }, 10);
}

// إعادة تعيين النموذج
function resetForm() {
    materials.forEach(material => {
        material.pricePerKg = 0;
        material.quantity = 0;
    });
    
    document.getElementById('soapOutput').value = 1;
    document.getElementById('soapPerPack').value = 27;
    document.getElementById('packagingCost').value = 0;
    document.getElementById('profitMargin').value = 30;
    
    initializeTable();
    
    // إعادة تعيين النتائج
    document.getElementById('totalMixtureCost').textContent = '0.00 جنيه';
    document.getElementById('unitCost').textContent = '0.00 جنيه';
    document.getElementById('packProductionCost').textContent = '0.00 جنيه';
    document.getElementById('packSalePrice').textContent = '0.00 جنيه';
    
    // إعادة رسالة الذكاء الاصطناعي الافتراضية
    document.querySelector('.ai-message').textContent = 'أنا هنا لمساعدتك في حساب تكاليف إنتاج الصابون بدقة متناهية!';
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializeTable();
    
    // إضافة مستمعي الأحداث للأزرار
    document.getElementById('calculateBtn').addEventListener('click', calculateCosts);
    document.getElementById('resetBtn').addEventListener('click', resetForm);
    
    // حساب تلقائي عند تغيير أي قيمة
    document.getElementById('soapOutput').addEventListener('input', calculateCosts);
    document.getElementById('soapPerPack').addEventListener('input', calculateCosts);
    document.getElementById('packagingCost').addEventListener('input', calculateCosts);
    document.getElementById('profitMargin').addEventListener('input', calculateCosts);
    
    // حساب أولي
    calculateCosts();
});