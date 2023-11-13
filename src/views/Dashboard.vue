<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="Total Orders" :value="totalOrders" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-world',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="Total Revenue" :value="totalRevenue" :percentage="{
          value: '+3%',
          color: 'text-success',
        }" :icon="{
  component: ' ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>


    </div>

    <div class="mt-4 row">

      <div class="">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart id="sale-chart-line" title="Revenue Trend" :chart="{
            labels: getLabels,
            datasets: getSaleDataSet,
          }" />
        </div>
      </div>
      <div class="mt-4">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart id="order-chart-line" title="Order Trend" :chart="{
            labels: getLabels,
            datasets: getOrderDataSet,
          }" />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import { format, parseISO } from 'date-fns';

import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    totalOrders() {
      return this.orders.length;
    },
    totalRevenue() {
      return `$${this.orders.reduce((total, order) => total + order.total, 0)}`;
    },
    getSaleAggregatedData() {
      const dailyData = this.aggregateOrdersSale(this.orders, 'daily');
      const weeklyData = this.aggregateOrdersSale(this.orders, 'weekly');
      const monthlyData = this.aggregateOrdersSale(this.orders, 'monthly');
      const annualData = this.aggregateOrdersSale(this.orders, 'annual');
      return {
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData,
        annual: annualData,
      };
    },
    getOrderAggregatedData() {
      const dailyData = this.aggregateOrders(this.orders, 'daily');
      const weeklyData = this.aggregateOrders(this.orders, 'weekly');
      const monthlyData = this.aggregateOrders(this.orders, 'monthly');
      const annualData = this.aggregateOrders(this.orders, 'annual');
      return {
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData,
        annual: annualData,
      };
    },
    getLabels() {
      return this.getSaleAggregatedData.daily.map(entry => entry.date)
      // return [...new Set(this.getSaleAggregatedData.daily.map(entry => this.mapDateToMonthName(entry.date)))]
    },
    getSaleDataSet() {
      return [
        {
          label: 'Daily Sales',
          data: this.getSaleAggregatedData.daily.map(entry => entry.total),
          borderColor: 'rgba(75, 192, 192, 1)',

        },
        {
          label: 'Weekly Sales',
          data: this.getSaleAggregatedData.weekly.map(entry => entry.total),
          borderColor: 'rgba(255, 99, 132, 1)',

        },
        {
          label: 'Monthly Sales',
          data: this.getSaleAggregatedData.monthly.map(entry => entry.total),
          borderColor: 'rgba(54, 162, 235, 1)',

        },
        {
          label: 'Annual Sales',
          data: this.getSaleAggregatedData.annual.map(entry => entry.total),
          borderColor: 'rgba(255, 206, 86, 1)',

        },
      ]
    },
    getOrderDataSet() {
      return [
        {
          label: 'Daily Order',
          data: this.getOrderAggregatedData.daily.map(entry => entry.total),
          borderColor: 'rgba(75, 192, 192, 1)',

        },
        {
          label: 'Weekly Order',
          data: this.getOrderAggregatedData.weekly.map(entry => entry.total),
          borderColor: 'rgba(255, 99, 132, 1)',

        },
        {
          label: 'Monthly Order',
          data: this.getOrderAggregatedData.monthly.map(entry => entry.total),
          borderColor: 'rgba(54, 162, 235, 1)',

        },
        {
          label: 'Annual Order',
          data: this.getOrderAggregatedData.annual.map(entry => entry.total),
          borderColor: 'rgba(255, 206, 86, 1)',

        },
      ]
    }
  },
  methods: {
    aggregateOrdersSale(orders, interval) {
      const aggregated = {};

      const formatMapping = {
        daily: 'yyyy-MM-dd',
        weekly: 'yyyy-ww',
        monthly: 'yyyy-MM',
        annual: 'yyyy',
      };

      orders.forEach((order) => {
        const date = new Date(order.date);
        const formattedDate = format(date, formatMapping[interval]);

        if (!aggregated[formattedDate]) {
          aggregated[formattedDate] = { date: formattedDate, total: 0 };
        }

        aggregated[formattedDate].total += order.total;
      });

      return Object.values(aggregated);
    },
    aggregateOrders(orders, interval) {
      const aggregated = {};

      const formatMapping = {
        daily: 'yyyy-MM-dd',
        weekly: 'yyyy-ww',
        monthly: 'yyyy-MM',
        annual: 'yyyy',
      };

      orders.forEach((order) => {
        const date = new Date(order.date);
        const formattedDate = format(date, formatMapping[interval]);

        if (!aggregated[formattedDate]) {
          aggregated[formattedDate] = { date: formattedDate, total: 0 };
        }

        aggregated[formattedDate].total += order.products.length;
      });

      return Object.values(aggregated);
    },
    mapDateToMonthName(dateString) {
      const date = parseISO(dateString);
      return format(date, 'MMMM');
    }

  },
  components: {
    MiniStatisticsCard,
    GradientLineChart,
  },
};
</script>
