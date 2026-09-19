import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDuration, getDaysOfYear, getSeasonEvents, SunDay } from "./src/astronomy";

const LOCATION = { name: "Erftstadt", latitude: 50.81, longitude: 6.77 };
const MONTHS = ["JAN", "FEB", "MÄR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"];
const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

const time = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
});

function DayRow({ day, today }: { day: SunDay; today: boolean }) {
  const date = day.date;
  return (
    <View style={[styles.dayRow, today && styles.todayRow]}>
      <View style={styles.dateCell}>
        <Text style={[styles.dayNumber, today && styles.todayText]}>{date.getUTCDate()}</Text>
        <Text style={[styles.weekday, today && styles.todaySubtext]}>{WEEKDAYS[date.getUTCDay()]}</Text>
      </View>
      <View style={styles.sunCell}>
        <MaterialCommunityIcons name="weather-sunset-up" size={19} color={today ? "#fff" : "#D68B42"} />
        <Text style={[styles.sunTime, today && styles.todayText]}>{time.format(day.sunrise)}</Text>
      </View>
      <View style={styles.sunCell}>
        <MaterialCommunityIcons name="weather-sunset-down" size={19} color={today ? "#fff" : "#7E6A9B"} />
        <Text style={[styles.sunTime, today && styles.todayText]}>{time.format(day.sunset)}</Text>
      </View>
      <Text style={[styles.duration, today && styles.todayText]}>{formatDuration(day.daylightMinutes)}</Text>
    </View>
  );
}

export default function App() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const days = useMemo(() => getDaysOfYear(year, LOCATION.latitude, LOCATION.longitude), [year]);
  const events = useMemo(() => getSeasonEvents(year), [year]);
  const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.shell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>SONNENZEIT</Text>
            <Text style={styles.title}>Licht im Jahreslauf</Text>
          </View>
          <TouchableOpacity style={styles.locationButton} accessibilityLabel="Standort auswählen">
            <MaterialCommunityIcons name="map-marker-outline" size={19} color="#38554B" />
            <Text style={styles.locationText}>{LOCATION.name}</Text>
            <MaterialCommunityIcons name="chevron-down" size={17} color="#38554B" />
          </TouchableOpacity>
        </View>

        <View style={styles.yearBar}>
          <TouchableOpacity onPress={() => setYear((value) => value - 1)} accessibilityLabel="Vorheriges Jahr">
            <MaterialCommunityIcons name="chevron-left" size={30} color="#38554B" />
          </TouchableOpacity>
          <Text style={styles.year}>{year}</Text>
          <TouchableOpacity onPress={() => setYear((value) => value + 1)} accessibilityLabel="Nächstes Jahr">
            <MaterialCommunityIcons name="chevron-right" size={30} color="#38554B" />
          </TouchableOpacity>
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendDate}>DATUM</Text>
          <Text style={styles.legendItem}>AUFGANG</Text>
          <Text style={styles.legendItem}>UNTERGANG</Text>
          <Text style={styles.legendDuration}>DAUER</Text>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {MONTHS.map((month, monthIndex) => {
            const monthDays = days.filter((day) => day.date.getUTCMonth() === monthIndex);
            const monthEvent = events.find((event) => event.date.getUTCMonth() === monthIndex);
            return (
              <View key={month}>
                <View style={styles.monthHeader}>
                  <Text style={styles.month}>{month}</Text>
                  <View style={styles.monthLine} />
                </View>
                {monthDays.map((day) => {
                  const key = `${year}-${monthIndex}-${day.date.getUTCDate()}`;
                  const eventToday = monthEvent?.date.getUTCDate() === day.date.getUTCDate();
                  return (
                    <View key={key}>
                      {eventToday && (
                        <View style={styles.eventRow}>
                          <MaterialCommunityIcons
                            name={monthEvent.kind === "equinox" ? "circle-half-full" : "weather-sunny"}
                            size={16}
                            color="#A76A35"
                          />
                          <Text style={styles.eventText}>
                            {monthEvent.season === "Frühling" || monthEvent.season === "Herbst"
                              ? `${monthEvent.season}-Tagundnachtgleiche`
                              : `${monthEvent.season}sonnenwende`}
                          </Text>
                        </View>
                      )}
                      <DayRow day={day} today={key === todayKey} />
                    </View>
                  );
                })}
              </View>
            );
          })}
          <Text style={styles.footer}>Berechnet für {LOCATION.latitude.toFixed(2)}° N · {LOCATION.longitude.toFixed(2)}° O</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F3EA" },
  shell: { flex: 1, width: "100%", maxWidth: 560, alignSelf: "center", backgroundColor: "#F7F3EA" },
  header: { paddingHorizontal: 22, paddingTop: Platform.OS === "web" ? 28 : 16, paddingBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { color: "#A76A35", fontSize: 11, letterSpacing: 2.5, fontWeight: "700", marginBottom: 5 },
  title: { color: "#243C35", fontSize: 24, fontWeight: "700", letterSpacing: -0.5 },
  locationButton: { flexDirection: "row", gap: 4, alignItems: "center", backgroundColor: "#E9EADF", borderRadius: 18, paddingHorizontal: 11, paddingVertical: 8 },
  locationText: { color: "#38554B", fontSize: 13, fontWeight: "600" },
  yearBar: { marginHorizontal: 22, backgroundColor: "#EDE9DE", borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  year: { color: "#263E36", fontSize: 20, fontWeight: "700", fontVariant: ["tabular-nums"] },
  legend: { flexDirection: "row", marginHorizontal: 22, paddingTop: 20, paddingBottom: 8 },
  legendDate: { width: "28%", color: "#8B877C", fontSize: 9, letterSpacing: 1.1, fontWeight: "700" },
  legendItem: { width: "25%", color: "#8B877C", fontSize: 9, letterSpacing: 1.1, fontWeight: "700" },
  legendDuration: { width: "22%", textAlign: "right", color: "#8B877C", fontSize: 9, letterSpacing: 1.1, fontWeight: "700" },
  list: { paddingHorizontal: 22, paddingBottom: 36 },
  monthHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12, marginBottom: 4 },
  month: { color: "#A76A35", fontSize: 11, fontWeight: "800", letterSpacing: 1.7 },
  monthLine: { height: 1, flex: 1, backgroundColor: "#DED8CB" },
  dayRow: { minHeight: 42, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E1DCD1", flexDirection: "row", alignItems: "center", paddingHorizontal: 8, borderRadius: 9 },
  todayRow: { backgroundColor: "#3F6458", borderBottomColor: "transparent", marginVertical: 2 },
  dateCell: { width: "26%", flexDirection: "row", alignItems: "baseline", gap: 8 },
  dayNumber: { color: "#303E39", fontSize: 15, fontWeight: "600", fontVariant: ["tabular-nums"] },
  weekday: { color: "#999388", fontSize: 11 },
  sunCell: { width: "25%", flexDirection: "row", alignItems: "center", gap: 7 },
  sunTime: { color: "#3E4542", fontSize: 14, fontVariant: ["tabular-nums"] },
  duration: { width: "24%", textAlign: "right", color: "#3E4542", fontSize: 14, fontWeight: "600", fontVariant: ["tabular-nums"] },
  todayText: { color: "#FFF" },
  todaySubtext: { color: "#D9E7E1" },
  eventRow: { height: 31, marginTop: 4, backgroundColor: "#F0E3D1", borderRadius: 8, flexDirection: "row", gap: 7, alignItems: "center", paddingHorizontal: 11 },
  eventText: { color: "#8C5930", fontSize: 11, fontWeight: "700", letterSpacing: 0.2 },
  footer: { textAlign: "center", color: "#9B958A", fontSize: 11, marginTop: 24 },
});
