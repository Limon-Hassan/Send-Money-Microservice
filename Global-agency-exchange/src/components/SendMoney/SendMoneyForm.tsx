"use client";

import { useMemo, useState, FormEvent, ChangeEvent } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";

// Define types
type CurrencyCode = "USD" | "EUR" | "GBP";
type Country =
  | "Germany"
  | "France"
  | "Spain"
  | "Italy"
  | "Netherlands"
  | "Portugal"
  | "Belgium"
  | "Ireland";
type PaymentMethod = "Bank Transfer" | "Debit Card" | "Credit Card" | "Wallet";

interface Currency {
  code: CurrencyCode;
  label: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const CURRENCIES: Currency[] = [
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
];

const COUNTRIES: Country[] = [
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Portugal",
  "Belgium",
  "Ireland",
];

const PAYMENT_METHODS: PaymentMethod[] = [
  "Bank Transfer",
  "Debit Card",
  "Credit Card",
  "Wallet",
];

// simple demo rates; in real app fetch dynamically
const RATES: ExchangeRates = {
  "USD->EUR": 0.9205,
  "USD->GBP": 0.7702,
  "EUR->USD": 1.0864,
  "EUR->GBP": 0.8366,
  "GBP->USD": 1.2983,
  "GBP->EUR": 1.1954,
};

const MoneyTransferForm = () => {
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("EUR");
  const [amount, setAmount] = useState<string>("1000");
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [bankCountry, setBankCountry] = useState<Country | "">("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PAYMENT_METHODS[0]
  );
  const [reference, setReference] = useState<string>("");

  // demo static fee (could vary by payment method)
  const transferFee = useMemo(
    () => (paymentMethod === "Bank Transfer" ? 2.99 : 4.99),
    [paymentMethod]
  );

  const rateKey = `${from}->${to}`;
  const exchangeRate = RATES[rateKey] ?? 1;

  // Convert fee into target currency for "recipient gets" math
  const recipientGets = useMemo(() => {
    const amt = Number(amount) || 0;
    const grossTarget = amt * exchangeRate;
    const feeInTarget =
      transferFee * (to === from ? 1 : RATES[`${from}->${to}`] ?? 1);
    const net = Math.max(grossTarget - feeInTarget, 0);
    return net;
  }, [amount, exchangeRate, transferFee, from, to]);

  const totalToPay = useMemo(() => {
    const amt = Number(amount) || 0;
    return amt + transferFee;
  }, [amount, transferFee]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit payload (demo)
    const payload = {
      from,
      to,
      amount: Number(amount),
      recipientName,
      recipientEmail,
      bankCountry,
      paymentMethod,
      reference,
      exchangeRate,
      transferFee,
      recipientGets,
      totalToPay,
    };
    console.log("submit", payload);
    alert("Proceeding to payment (demo). Check console for payload.");
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value as CurrencyCode);
  };

  const handleToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value as CurrencyCode);
  };

  const handleRecipientNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipientName(e.target.value);
  };

  const handleRecipientEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  const handleBankCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBankCountry(e.target.value as Country | "");
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
  };

  const handleReferenceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.target.value);
  };

  return (
    <div className="send-money-area ptb-120">
      <Container>
        <h2 className="main-title style-two text-center mw-1208 mb-40">
          Fast, secure, and low-cost international money transfers with
          competitive exchange rates
        </h2>

        <Row className="g-4">
          {/* Left: Form */}
          <Col lg={6}>
            <Card className="smcc-form bg-primary border-0">
              <Card.Body className="p-0">
                <Form onSubmit={handleSubmit}>
                  {/* Currency Conversion */}
                  <h3 className="mb-4 text-secondary">Currency Conversion</h3>

                  <Row className="g-3 align-items-end">
                    <Col md={6}>
                      <Form.Label className="small text-black">
                        You Send
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min={0}
                          value={amount}
                          onChange={handleAmountChange}
                        />
                        <Form.Select
                          value={from}
                          onChange={handleFromCurrencyChange}
                          style={{ maxWidth: 120 }}
                        >
                          {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col
                      md="auto"
                      className="d-none d-md-flex justify-content-center"
                    >
                      <Button
                        variant="outline-secondary"
                        className="rounded-pill"
                        onClick={handleSwap}
                      >
                        ⇄
                      </Button>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small text-black">
                        Recipient gets
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          value={recipientGets.toFixed(2)}
                          readOnly
                        />
                        <Form.Select
                          value={to}
                          onChange={handleToCurrencyChange}
                          style={{ maxWidth: 120 }}
                        >
                          {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                  </Row>

                  <p className="text-secondary mb-0 mt-2">
                    Exchange rate: 1 {from} = {exchangeRate.toFixed(4)} {to} (No
                    hidden fees)
                  </p>

                  {/* Recipient Details */}
                  <h3 className="mb-4 mt-5 text-secondary">
                    Recipient Details
                  </h3>
                  <Stack gap={3}>
                    <Form.Group>
                      <Form.Label className="small text-black">
                        Full Name
                      </Form.Label>
                      <Form.Control
                        placeholder="Recipient's full name"
                        value={recipientName}
                        onChange={handleRecipientNameChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="small text-black">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Recipient's email address"
                        value={recipientEmail}
                        onChange={handleRecipientEmailChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="small text-black">
                        Bank Country
                      </Form.Label>
                      <Form.Select
                        className="form-control"
                        value={bankCountry}
                        onChange={handleBankCountryChange}
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Stack>

                  {/* Payment Details */}
                  <h3 className="mb-4 mt-5 text-secondary">Payment Details</h3>
                  <Stack gap={3}>
                    <Form.Group>
                      <Form.Label className="small text-black">
                        Payment Method
                      </Form.Label>
                      <Form.Select
                        className="form-control"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        {PAYMENT_METHODS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="small text-black">
                        Reference (Optional)
                      </Form.Label>
                      <Form.Control
                        placeholder="e.g., Invoice number, purpose of transfer"
                        value={reference}
                        onChange={handleReferenceChange}
                      />
                    </Form.Group>
                  </Stack>

                  <div className="mt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-100 border-secondary"
                      variant="secondary"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Summary */}
          <Col lg={6}>
            <Card className="transfer-summary bg-f7f7f7 border-0">
              <Card.Body className="p-4">
                <h3>Transfer Summary</h3>

                <ul className="p-0 m-0 list-unstyled transfer-summary-list">
                  <li className="d-flex justify-content-between align-items-center">
                    <span>You send</span>
                    <span className="text-secondary">
                      $                       {Number(amount || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ${from}
                    </span>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <span>Recipient gets</span>
                    <span className="text-secondary">
                      {recipientGets.toFixed(2)} ${to}
                    </span>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <span>Exchange rate</span>
                    <span className="text-secondary">{`1 ${from} = ${exchangeRate.toFixed(
                      4
                    )} ${to}`}</span>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <span>Transfer fee</span>
                    <span className="text-secondary">{`${transferFee.toFixed(
                      2
                    )} ${from}`}</span>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <span>Delivery time</span>
                    <span className="text-secondary">1-2 business days</span>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary">Total to pay</span>
                    <span className="text-secondary fw-semibold">
                      ${totalToPay.toFixed(2)} ${from}
                    </span>
                  </li>
                </ul>

                <ul className="status-list p-0">
                  <li className="d-flex align-items-center gap-8">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>No hidden fees</span>
                  </li>
                  <li className="d-flex align-items-center gap-8">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>Granted exchange rate</span>
                  </li>
                  <li className="d-flex align-items-center gap-8">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>Fully secure transaction</span>
                  </li>
                </ul>

                <p>Your money is protected with bank-level security and encryption. Expa is fully regulated and compliant with international financial regulations.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoneyTransferForm;