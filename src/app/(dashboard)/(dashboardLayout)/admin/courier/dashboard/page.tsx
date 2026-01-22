"use client"
import React, { useState } from 'react';
import {
  useGetBalanceQuery,
  useCreateOrderMutation,
  useBulkCreateOrdersMutation,
  useLazyGetStatusByInvoiceQuery,
  useLazyGetStatusByConsignmentIdQuery,
  useLazyGetStatusByTrackingCodeQuery,
  useCreateReturnRequestMutation,
  useGetReturnRequestQuery,
  useGetReturnRequestsQuery,
} from "@/redux/featured/courier/steadfastApi";

export default function SteadfastApiTester() {
  const [activeTab, setActiveTab] = useState('balance');

  // Balance
  const { data: balance, isLoading: balanceLoading, refetch: refetchBalance } = useGetBalanceQuery();

  // Order Creation
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [orderForm, setOrderForm] = useState({
    invoice: '',
    recipient_name: '',
    recipient_phone: '',
    recipient_address: '',
    cod_amount: 0,
    note: '',
    alternative_phone: '',
    recipient_email: '',
    item_description: '',
    total_lot: 1
  });
  const [orderResult, setOrderResult] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successOrderData, setSuccessOrderData] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [copiedField, setCopiedField] = useState<string>('');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  // Bulk Orders
  const [bulkCreateOrders, { isLoading: bulkLoading }] = useBulkCreateOrdersMutation();
  const [bulkResult, setBulkResult] = useState<any>(null);

  // Tracking
  const [getStatusByInvoice] = useLazyGetStatusByInvoiceQuery();
  const [getStatusByConsignment] = useLazyGetStatusByConsignmentIdQuery();
  const [getStatusByTracking] = useLazyGetStatusByTrackingCodeQuery();
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingType, setTrackingType] = useState('invoice');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  // Returns
  const [createReturn, { isLoading: returnLoading }] = useCreateReturnRequestMutation();
  const [returnForm, setReturnForm] = useState({
    consignment_id: '',
    invoice: '',
    tracking_code: '',
    reason: ''
  });
  const [returnResult, setReturnResult] = useState(null);
  const [returnId, setReturnId] = useState('');
  const { data: singleReturn } = useGetReturnRequestQuery(returnId, { skip: !returnId });
  const { data: allReturns, refetch: refetchReturns } = useGetReturnRequestsQuery();
  type APIError = {
    data?: { message?: string; success?: boolean };
    message?: string;
    success?: boolean;
  };
  const validateForm = () => {
    const errors: any = {};
    if (!orderForm.invoice.trim()) errors.invoice = 'Invoice is required';
    if (!orderForm.recipient_name.trim()) errors.recipient_name = 'Recipient name is required';
    if (!orderForm.recipient_phone.trim()) {
      errors.recipient_phone = 'Phone number is required';
    } else if (!/^01[3-9]\d{8}$/.test(orderForm.recipient_phone)) {
      errors.recipient_phone = 'Phone must be 11 digits starting with 01 (e.g., 01712345678)';
    }
    if (!orderForm.recipient_address.trim()) errors.recipient_address = 'Address is required';
    if (orderForm.cod_amount <= 0) errors.cod_amount = 'COD amount must be greater than 0';
    if (orderForm.recipient_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderForm.recipient_email)) {
      errors.recipient_email = 'Please enter a valid email address';
    }
    return errors;
  };

  const handleCreateOrder = async () => {
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) return;

    try {
      const orderData = {
        invoice: orderForm.invoice,
        recipient_name: orderForm.recipient_name,
        recipient_phone: orderForm.recipient_phone,
        recipient_address: orderForm.recipient_address,
        cod_amount: orderForm.cod_amount,
        recipient_email: orderForm.recipient_email || undefined,
        alternative_phone: orderForm.alternative_phone || undefined,
        item_description: orderForm.item_description || undefined,
        note: orderForm.note || undefined,
      };
      const result = await createOrder(orderData).unwrap();
      setOrderResult({ success: true, data: result });
      setSuccessOrderData(result);
      setShowSuccessModal(true);
      setValidationErrors({});
    } catch (err: any) {
      if (err?.data?.errors) {
        setValidationErrors(err.data.errors);
      }
      setOrderResult({
        success: false,
        error: err?.data?.message || err?.message || "Something went wrong",
      });
    }
  };

  // Add state for bulk orders
  const [bulkOrders, setBulkOrders] = useState([
    {
      invoice: '',
      recipient_name: '',
      recipient_phone: '',
      recipient_address: '',
      cod_amount: 0,
      alternative_phone: '',
      recipient_email: '',
      item_description: '',
      total_lot: 1,
      note: ''
    }
  ]);

  const handleBulkOrder = async () => {
    try {
      // Send all form fields including optional ones
      const filteredOrders = bulkOrders.map(order => ({
        invoice: order.invoice,
        recipient_name: order.recipient_name,
        recipient_phone: order.recipient_phone,
        recipient_address: order.recipient_address,
        cod_amount: order.cod_amount,
        recipient_email: order.recipient_email || undefined,
        alternative_phone: order.alternative_phone || undefined,
        item_description: order.item_description || undefined,
        note: order.note || undefined,
      }));
      const result = await bulkCreateOrders(filteredOrders).unwrap();
      setBulkResult({ success: true, data: result });
    } catch (err) {
      const error = err as APIError;
      setBulkResult({
        success: false,
        error: error?.data?.message || error?.message || "Something went wrong",
      });
    }
  };

  const handleTracking = async () => {
    try {
      let result;
      if (trackingType === 'invoice') {
        result = await getStatusByInvoice(trackingInput).unwrap();
      } else if (trackingType === 'consignment') {
        result = await getStatusByConsignment(trackingInput).unwrap();
      } else {
        result = await getStatusByTracking(trackingInput).unwrap();
      }
      setTrackingResult({ success: true, data: result });
    } catch (error: any) {
      setTrackingResult({
        success: false,
        error:
          (typeof error === 'object' && error !== null && 'data' in error && (error as any).data?.message) ||
          (error instanceof Error && error.message) ||
          String(error)
      });
    }
  };

  const handleCreateReturn = async () => {
    try {
      const result = await createReturn(returnForm).unwrap();
      setReturnResult(() => ({ success: true, data: result } as any));
      refetchReturns();
    } catch (err) {
      const error = err as APIError;
      setReturnResult(() => ({
        success: !!(error && (error as any).data?.success),
        error: error?.data?.message || error?.message || "Something went wrong",
      } as any));
    }
  };
  const tabs = [
    { id: 'balance', label: '💰 Balance' },
    { id: 'order', label: '📦 Create Order' },
    { id: 'bulk', label: '📦 Bulk Orders' },
    { id: 'tracking', label: '📍 Tracking' },
    { id: 'returns', label: '🔄 Returns' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Steadfast API Tester</h1>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'balance' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Check Balance</h2>
            <button
              onClick={() => refetchBalance()}
              disabled={balanceLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {balanceLoading ? 'Loading...' : 'Refresh Balance'}
            </button>
            {balance && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-lg"><strong>Balance:</strong> {balance.current_balance} {balance.currency}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'order' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Create Single Order</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number *</label>
                  <input
                    type="text"
                    placeholder="INV-001"
                    value={orderForm.invoice}
                    onChange={(e) => setOrderForm({ ...orderForm, invoice: e.target.value })}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.invoice ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.invoice && <p className="text-red-500 text-sm mt-1">{validationErrors.invoice}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={orderForm.recipient_name}
                    onChange={(e) => setOrderForm({ ...orderForm, recipient_name: e.target.value })}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.recipient_name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.recipient_name && <p className="text-red-500 text-sm mt-1">{Array.isArray(validationErrors.recipient_name) ? validationErrors.recipient_name[0] : validationErrors.recipient_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    placeholder="01712345678"
                    value={orderForm.recipient_phone}
                    onChange={(e) => setOrderForm({ ...orderForm, recipient_phone: e.target.value })}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.recipient_phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.recipient_phone && <p className="text-red-500 text-sm mt-1">{Array.isArray(validationErrors.recipient_phone) ? validationErrors.recipient_phone[0] : validationErrors.recipient_phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone</label>
                  <input
                    type="text"
                    placeholder="01887654321"
                    value={orderForm.alternative_phone}
                    onChange={(e) => setOrderForm({ ...orderForm, alternative_phone: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    placeholder="recipient@example.com"
                    value={orderForm.recipient_email}
                    onChange={(e) => setOrderForm({ ...orderForm, recipient_email: e.target.value })}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.recipient_email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.recipient_email && <p className="text-red-500 text-sm mt-1">{Array.isArray(validationErrors.recipient_email) ? validationErrors.recipient_email[0] : validationErrors.recipient_email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">COD Amount *</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={orderForm.cod_amount}
                    onChange={(e) => setOrderForm({ ...orderForm, cod_amount: Number(e.target.value) })}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.cod_amount ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.cod_amount && <p className="text-red-500 text-sm mt-1">{validationErrors.cod_amount}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address *</label>
                <textarea
                  placeholder="House 123, Road 456, Dhaka"
                  value={orderForm.recipient_address}
                  onChange={(e) => setOrderForm({ ...orderForm, recipient_address: e.target.value })}
                  className={`w-full border rounded px-3 py-2 ${validationErrors.recipient_address ? 'border-red-500' : 'border-gray-300'}`}
                  rows={2}
                />
                {validationErrors.recipient_address && <p className="text-red-500 text-sm mt-1">{validationErrors.recipient_address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
                <textarea
                  placeholder="T-shirt - Size M - Blue color"
                  value={orderForm.item_description}
                  onChange={(e) => setOrderForm({ ...orderForm, item_description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  placeholder="Handle with care"
                  value={orderForm.note}
                  onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={2}
                />
              </div>
              <button
                onClick={handleCreateOrder}
                disabled={orderLoading}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {orderLoading ? 'Creating...' : 'Create Order'}
              </button>
            </div>

          </div>
        )}

        {activeTab === 'bulk' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Bulk Create Orders</h2>

            {bulkOrders.map((order, index) => (
              <div key={index} className="mb-6 p-4 border rounded bg-gray-50 relative">
                <h3 className="font-medium mb-3">Order {index + 1}</h3>

                {bulkOrders.length > 1 && (
                  <button
                    onClick={() => {
                      const newOrders = bulkOrders.filter((_, i) => i !== index);
                      setBulkOrders(newOrders);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-xl"
                  >
                    ×
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Invoice *"
                    value={order.invoice}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].invoice = e.target.value;
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Recipient Name *"
                    value={order.recipient_name}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].recipient_name = e.target.value;
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Phone *"
                    value={order.recipient_phone}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].recipient_phone = e.target.value;
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Alternative Phone"
                    value={order.alternative_phone}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].alternative_phone = e.target.value;
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={order.recipient_email}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].recipient_email = e.target.value;
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="COD Amount *"
                    value={order.cod_amount}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].cod_amount = Number(e.target.value);
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Total Lot"
                    value={order.total_lot}
                    onChange={(e) => {
                      const newOrders = [...bulkOrders];
                      newOrders[index].total_lot = Number(e.target.value);
                      setBulkOrders(newOrders);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <textarea
                  placeholder="Recipient Address *"
                  value={order.recipient_address}
                  onChange={(e) => {
                    const newOrders = [...bulkOrders];
                    newOrders[index].recipient_address = e.target.value;
                    setBulkOrders(newOrders);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
                  rows={2}
                />
                <textarea
                  placeholder="Item Description"
                  value={order.item_description}
                  onChange={(e) => {
                    const newOrders = [...bulkOrders];
                    newOrders[index].item_description = e.target.value;
                    setBulkOrders(newOrders);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
                  rows={2}
                />
                <textarea
                  placeholder="Note"
                  value={order.note}
                  onChange={(e) => {
                    const newOrders = [...bulkOrders];
                    newOrders[index].note = e.target.value;
                    setBulkOrders(newOrders);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
                  rows={2}
                />
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={() =>
                  setBulkOrders([
                    ...bulkOrders,
                    {
                      invoice: '',
                      recipient_name: '',
                      recipient_phone: '',
                      recipient_address: '',
                      cod_amount: 0,
                      alternative_phone: '',
                      recipient_email: '',
                      item_description: '',
                      total_lot: 1,
                      note: ''
                    }
                  ])
                }
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                + Add Another Order
              </button>

              <button
                onClick={handleBulkOrder}
                disabled={bulkLoading}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
              >
                {bulkLoading ? 'Creating...' : `Create ${bulkOrders.length} Order(s)`}
              </button>
            </div>

            {bulkResult && (
              <div className={`mt-4 p-4 rounded ${bulkResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <pre className="text-sm overflow-auto">{JSON.stringify(bulkResult, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Track Order Status</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <select
                  value={trackingType}
                  onChange={(e) => setTrackingType(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="invoice">By Invoice</option>
                  <option value="consignment">By Consignment ID</option>
                  <option value="tracking">By Tracking Code</option>
                </select>
                <input
                  type="text"
                  placeholder={`Enter ${trackingType}...`}
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <button
                  onClick={handleTracking}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Track
                </button>
              </div>
            </div>
            {trackingResult && (
              <div className={`mt-4 p-4 rounded ${trackingResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <pre className="text-sm overflow-auto">{JSON.stringify(trackingResult, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Return Request</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consignment ID *</label>
                    <input
                      type="text"
                      placeholder="183321695"
                      value={returnForm.consignment_id}
                      onChange={(e) => setReturnForm({ ...returnForm, consignment_id: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice</label>
                    <input
                      type="text"
                      placeholder="TUDR"
                      value={returnForm.invoice}
                      onChange={(e) => setReturnForm({ ...returnForm, invoice: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Code</label>
                    <input
                      type="text"
                      placeholder="SFR251021STF6167F2BD"
                      value={returnForm.tracking_code}
                      onChange={(e) => setReturnForm({ ...returnForm, tracking_code: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Reason *</label>
                  <textarea
                    placeholder="Customer requested return due to size issue"
                    value={returnForm.reason}
                    onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={2}
                  />
                </div>
                <button
                  onClick={handleCreateReturn}
                  disabled={returnLoading}
                  className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 disabled:bg-gray-400"
                >
                  {returnLoading ? 'Creating...' : 'Create Return'}
                </button>
              </div>
              {returnResult && typeof returnResult === 'object' && returnResult !== null && (returnResult as any).success !== undefined && (
                <div className={`mt-4 p-4 rounded ${(returnResult as any).success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <pre className="text-sm overflow-auto">{JSON.stringify(returnResult, null, 2)}</pre>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Get Single Return</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Return Request ID"
                  value={returnId}
                  onChange={(e) => setReturnId(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {singleReturn && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <pre className="text-sm overflow-auto">{JSON.stringify(singleReturn, null, 2)}</pre>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">All Return Requests</h3>
              <button
                onClick={() => refetchReturns()}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
              >
                Refresh List
              </button>
              {allReturns && allReturns.length > 0 ? (
                <div className="space-y-2">
                  {allReturns.map((ret, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded">
                      <p><strong>ID:</strong> {ret.id}</p>
                      <p><strong>Consignment:</strong> {ret.consignment_id}</p>
                      <p><strong>Status:</strong> {ret.status}</p>
                      <p><strong>Reason:</strong> {ret.reason}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No return requests found</p>
              )}
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && successOrderData && (
          <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="text-center">
                <div className="text-green-500 text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Created Successfully!</h3>
                
                <div className="text-left space-y-3 mb-6">
                  <div>
                    <strong>Consignment ID:</strong>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex-1">{successOrderData.consignment?.consignment_id}</span>
                      <button 
                        onClick={() => copyToClipboard(successOrderData.consignment?.consignment_id, 'consignment')}
                        className="border border-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-50 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                        {copiedField === 'consignment' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <strong>Invoice:</strong>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex-1">{successOrderData.consignment?.invoice}</span>
                      <button 
                        onClick={() => copyToClipboard(successOrderData.consignment?.invoice, 'invoice')}
                        className="border border-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-50 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                        {copiedField === 'invoice' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <strong>Tracking Code:</strong>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex-1">{successOrderData.consignment?.tracking_code}</span>
                      <button 
                        onClick={() => copyToClipboard(successOrderData.consignment?.tracking_code, 'tracking')}
                        className="border border-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-50 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                        {copiedField === 'tracking' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <p><strong>Status:</strong> <span className="capitalize">{successOrderData.consignment?.status}</span></p>
                  <p><strong>Recipient:</strong> {successOrderData.consignment?.recipient_name}</p>
                  <p><strong>Phone:</strong> {successOrderData.consignment?.recipient_phone}</p>
                  <p><strong>Address:</strong> {successOrderData.consignment?.recipient_address}</p>
                  <p><strong>COD Amount:</strong> {successOrderData.consignment?.cod_amount}</p>
                  {successOrderData.consignment?.recipient_email && <p><strong>Email:</strong> {successOrderData.consignment?.recipient_email}</p>}
                  {successOrderData.consignment?.alternative_phone && <p><strong>Alt Phone:</strong> {successOrderData.consignment?.alternative_phone}</p>}
                  {successOrderData.consignment?.item_description && <p><strong>Item:</strong> {successOrderData.consignment?.item_description}</p>}
                  {successOrderData.consignment?.note && <p><strong>Note:</strong> {successOrderData.consignment?.note}</p>}
                  <p><strong>Created:</strong> {new Date(successOrderData.consignment?.created_at).toLocaleString()}</p>
                </div>
                
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setSuccessOrderData(null);
                    setCopiedField('');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}