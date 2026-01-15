import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AboutUs from "@/pages/AboutUs";
import AlbaToken from "@/pages/AlbaToken";
import FAQ from "@/pages/FAQ";
import BookingApp from "@/pages/BookingApp";
import Agent from "@/pages/Agent";
import AppHome from "@/pages/AppHome";
import Dashboard from "@/pages/Dashboard";
import PaymentProof from "@/pages/PaymentProof";
import ConfidentialTransfer from "@/pages/ConfidentialTransfer";
import ZKAccessPass from "@/pages/ZKAccessPass";
import Authenticate from "@/pages/Authenticate";
import AppAuth from "@/pages/AppAuth";
import Jobs from "@/pages/Jobs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/about" component={AboutUs} />
      <Route path="/alba-token" component={AlbaToken} />
      <Route path="/faq" component={FAQ} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/app" component={AppHome} />
      <Route path="/app/auth" component={AppAuth} />
      <Route path="/app/agent" component={Agent} />
      <Route path="/app/stealth" component={Dashboard} />
      <Route path="/app/proof" component={PaymentProof} />
      <Route path="/app/transfer" component={ConfidentialTransfer} />
      <Route path="/app/access" component={ZKAccessPass} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
