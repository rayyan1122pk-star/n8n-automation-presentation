import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def create_invoice(filename, data):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    brand_style = ParagraphStyle(
        'BrandTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#4C1D95')
    )
    
    invoice_title_style = ParagraphStyle(
        'InvoiceTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        alignment=2, # Right
        textColor=colors.HexColor('#1E1B4B')
    )
    
    meta_right_style = ParagraphStyle(
        'MetaRight',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        alignment=2, # Right
        textColor=colors.HexColor('#475569')
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155')
    )
    
    bold_style = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0F172A')
    )
    
    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.white
    )
    
    story = []
    
    # 1. Header (Vendor Name & INVOICE label)
    header_data = [
        [
            Paragraph(f"<b>{data['vendor_name']}</b><br/><font size=8 color='#64748B'>{data['vendor_tagline']}</font>", brand_style),
            Paragraph("INVOICE", invoice_title_style)
        ]
    ]
    t_header = Table(header_data, colWidths=[3.2*inch, 4.0*inch])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_header)
    
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#7C3AED'), spaceAfter=14))
    
    # 2. Addresses & Invoice Meta
    address_data = [
        [
            Paragraph("<b>FROM (VENDOR):</b>", bold_style),
            Paragraph("<b>INVOICE DETAILS:</b>", bold_style)
        ],
        [
            Paragraph(
                f"<b>{data['vendor_name']}</b><br/>"
                f"{data['vendor_address']}<br/>"
                f"Email: {data['vendor_email']}<br/>"
                f"Phone: {data['vendor_phone']}<br/>"
                f"Category: <i>{data['category']}</i>",
                body_style
            ),
            Paragraph(
                f"<b>Invoice Number:</b> {data['invoice_number']}<br/>"
                f"<b>Invoice Date:</b> {data['invoice_date']}<br/>"
                f"<b>Payment Due Date:</b> {data['due_date']}<br/>"
                f"<b>Payment Terms:</b> {data['terms']}<br/>"
                f"<b>Currency:</b> {data['currency']}",
                body_style
            )
        ]
    ]
    t_address = Table(address_data, colWidths=[3.6*inch, 3.6*inch])
    t_address.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_address)
    story.append(Spacer(1, 14))
    
    # Bill To
    bill_to_data = [
        [
            Paragraph("<b>BILL TO (CLIENT):</b>", bold_style),
            Paragraph("<b>PAYMENT STATUS:</b>", bold_style)
        ],
        [
            Paragraph(
                f"<b>{data['client_name']}</b><br/>"
                f"{data['client_address']}<br/>"
                f"Email: {data['client_email']}",
                body_style
            ),
            Paragraph(
                f"<font color='#7C3AED'><b>● PENDING PAYMENT (NET 30)</b></font><br/>"
                f"Direct Electronic Transfer / Wire<br/>"
                f"Account Ref: {data['invoice_number']}",
                body_style
            )
        ]
    ]
    t_billto = Table(bill_to_data, colWidths=[3.6*inch, 3.6*inch])
    t_billto.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_billto)
    story.append(Spacer(1, 18))
    
    # 3. Line Items Table
    items_rows = [
        [
            Paragraph("ITEM DESCRIPTION", table_header_style),
            Paragraph("QTY", table_header_style),
            Paragraph("UNIT PRICE", table_header_style),
            Paragraph("TOTAL", table_header_style)
        ]
    ]
    
    for item in data['items']:
        items_rows.append([
            Paragraph(f"<b>{item['desc']}</b><br/><font size=8 color='#64748B'>{item.get('sub', '')}</font>", body_style),
            Paragraph(str(item['qty']), body_style),
            Paragraph(f"${item['price']:,.2f}", body_style),
            Paragraph(f"<b>${item['total']:,.2f}</b>", body_style),
        ])
        
    t_items = Table(items_rows, colWidths=[4.2*inch, 0.7*inch, 1.1*inch, 1.2*inch])
    t_items.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#4C1D95')),
        ('ALIGN', (1,0), (-1,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
    ]))
    story.append(t_items)
    story.append(Spacer(1, 14))
    
    # 4. Totals Calculation Table
    totals_data = [
        ["", Paragraph("<b>Subtotal:</b>", body_style), Paragraph(f"${data['subtotal']:,.2f} {data['currency']}", body_style)],
        ["", Paragraph(f"<b>Tax ({data['tax_rate']}):</b>", body_style), Paragraph(f"${data['tax_amount']:,.2f} {data['currency']}", body_style)],
        ["", Paragraph("<b>TOTAL AMOUNT DUE:</b>", bold_style), Paragraph(f"<b>${data['total_amount']:,.2f} {data['currency']}</b>", ParagraphStyle('TotalBold', parent=bold_style, fontSize=12, textColor=colors.HexColor('#4C1D95')))],
    ]
    t_totals = Table(totals_data, colWidths=[4.0*inch, 1.8*inch, 1.4*inch])
    t_totals.setStyle(TableStyle([
        ('ALIGN', (1,0), (-1,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LINEABOVE', (1,2), (2,2), 1.5, colors.HexColor('#4C1D95')),
    ]))
    story.append(t_totals)
    story.append(Spacer(1, 24))
    
    # 5. Notes & Verification Stamp
    notes_data = [
        [
            Paragraph(
                "<b>PAYMENT INSTRUCTIONS & NOTES:</b><br/>"
                "Please send ACH / Wire payment referencing the invoice number above.<br/>"
                "Bank: Silicon Valley Commercial Bank · Routing: 121000358 · Acct: 9842104928<br/>"
                "<i>Thank you for your business! This invoice is generated for automated bookkeeping verification.</i>",
                body_style
            ),
            Paragraph(
                "<font color='#4C1D95'><b>[ VERIFIED DOCUMENT ]</b></font><br/>"
                f"<font size=8 color='#64748B'>Deterministic Hash: {data['hash']}<br/>"
                "OCR Quality: 100% High Resolution Text<br/>"
                "Engine: n8n FinFlow Ingestion Ready</font>",
                body_style
            )
        ]
    ]
    t_notes = Table(notes_data, colWidths=[4.8*inch, 2.4*inch])
    t_notes.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F5F3FF')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#DDD6FE')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_notes)
    
    doc.build(story)
    print(f"Generated: {filename} ({os.path.getsize(filename)} bytes)")

if __name__ == '__main__':
    os.makedirs("d:/Claude code/automate-ai/public/samples", exist_ok=True)
    
    # Invoice 1: Cloud Infrastructure
    inv1 = {
        'vendor_name': 'Apex Cloud Infrastructure Ltd',
        'vendor_tagline': 'Enterprise Cloud & Managed Kubernetes Hosting',
        'vendor_address': '100 Tech Horizon Blvd, Suite 400, San Francisco, CA 94107',
        'vendor_email': 'billing@apexcloud.io',
        'vendor_phone': '+1 (415) 555-0192',
        'category': 'Software & Cloud Infrastructure',
        'invoice_number': 'INV-2026-8942',
        'invoice_date': '2026-11-15',
        'due_date': '2026-12-15',
        'terms': 'Net 30 Days',
        'currency': 'USD',
        'client_name': 'Automate AI Enterprises LLC',
        'client_address': '742 Innovation Way, Floor 3, Austin, TX 78701',
        'client_email': 'accounts@automateai.io',
        'items': [
            {
                'desc': 'Dedicated Production Kubernetes Cluster (EKS Node Group)',
                'sub': '3x m6i.2xlarge compute instances with 24/7 SLA monitoring',
                'qty': 1,
                'price': 1200.00,
                'total': 1200.00
            },
            {
                'desc': 'High-Throughput NVMe Object Storage (5TB Tier-1)',
                'sub': 'Replicated block storage pool with automated hourly snapshots',
                'qty': 1,
                'price': 250.00,
                'total': 250.00
            }
        ],
        'subtotal': 1450.00,
        'tax_rate': '10.0% Standard VAT',
        'tax_amount': 145.00,
        'total_amount': 1595.00,
        'hash': '8f9a2b4c6e1d'
    }
    
    # Invoice 2: AI & LLM API Services
    inv2 = {
        'vendor_name': 'Synthetix AI Solutions Inc',
        'vendor_tagline': 'Next-Gen Neural Inference & Enterprise Model APIs',
        'vendor_address': '450 Innovation Parkway, Suite 800, Seattle, WA 98101',
        'vendor_email': 'invoices@synthetix.ai',
        'vendor_phone': '+1 (206) 555-0144',
        'category': 'AI Models & API Services',
        'invoice_number': 'INV-2026-3104',
        'invoice_date': '2026-11-18',
        'due_date': '2026-12-18',
        'terms': 'Net 30 Days',
        'currency': 'USD',
        'client_name': 'Automate AI Enterprises LLC',
        'client_address': '742 Innovation Way, Floor 3, Austin, TX 78701',
        'client_email': 'accounts@automateai.io',
        'items': [
            {
                'desc': 'Enterprise Neural Inference API Gateway (Tier-A)',
                'sub': 'High-speed embedding pipelines and batch inference endpoints',
                'qty': 1,
                'price': 750.00,
                'total': 750.00
            },
            {
                'desc': 'Dedicated Fine-Tuning Compute Hours (H100 GPU)',
                'sub': '10 compute units with priority scheduling & model export',
                'qty': 1,
                'price': 100.00,
                'total': 100.00
            }
        ],
        'subtotal': 850.00,
        'tax_rate': '10.0% Standard VAT',
        'tax_amount': 85.00,
        'total_amount': 935.00,
        'hash': '3c7d9e1a5b8f'
    }
    
    # Save in public folder (for browser download / direct access)
    create_invoice("d:/Claude code/automate-ai/public/samples/sample_invoice_cloud_services.pdf", inv1)
    create_invoice("d:/Claude code/automate-ai/public/samples/sample_invoice_ai_services.pdf", inv2)
    
    # Also save in root automate-ai directory for easy drag & drop
    create_invoice("d:/Claude code/automate-ai/sample_invoice_cloud_services.pdf", inv1)
    create_invoice("d:/Claude code/automate-ai/sample_invoice_ai_services.pdf", inv2)
