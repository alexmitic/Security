package tcs.lbs.intentsniffer;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity
{
    TextView LatitudeTextView, LongitudeTextView;


    static final String interRECEIVER_ACTION = "tcs.lbs.weather_app.WeatherBroadcastReceiver";
    //static final String intraRECEIVER_ACTION = "tcs.lbs.locationapp.MainActivityReceiver";
    LocationBroadcastReceiver lReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LatitudeTextView = findViewById(R.id.LatitudeTextView);
        LongitudeTextView = findViewById(R.id.LongitudeTextView);


        // TODO Define a broadcast receiver class
        // TODO Register to receive broadcast messages from ForegroundLocationService of the LocationApp
        // TODO Extract Location coordinates from the broadcast massage and show them in LatitudeTextView and LongitudeTextView
    }

    @Override
    protected void onResume()
    {
        super.onResume();

        IntentFilter filter = new IntentFilter();
        filter.addAction(interRECEIVER_ACTION);
        //filter.addAction(intraRECEIVER_ACTION);

        lReceiver = new LocationBroadcastReceiver();
        registerReceiver(lReceiver, filter);
    }

    @Override
    protected void onStop()
    {
        super.onStop();
        unregisterReceiver(lReceiver);
    }


    public class LocationBroadcastReceiver extends BroadcastReceiver
    {

        @Override
        public void onReceive(Context context, Intent intent)
        {
            Bundle extras = intent.getExtras();
            Location loc = (Location)extras.get("Location");
	    	if (loc != null){
		        String lat= "" + loc.getLatitude();
		        String lon= "" + loc.getLongitude();
		        LatitudeTextView.setText(lat);
		        LongitudeTextView.setText(lon);
			}
        }
    }
}
